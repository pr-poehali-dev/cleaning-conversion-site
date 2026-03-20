import os
import json
import urllib.request
import base64


def send_message(bot_token: str, chat_id: str, text: str):
    payload = json.dumps({
        'chat_id': chat_id,
        'text': text,
        'parse_mode': 'Markdown'
    }).encode()
    req = urllib.request.Request(
        f'https://api.telegram.org/bot{bot_token}/sendMessage',
        data=payload,
        headers={'Content-Type': 'application/json'},
        method='POST'
    )
    with urllib.request.urlopen(req) as resp:
        resp.read()


def send_photo(bot_token: str, chat_id: str, photo_b64: str, caption: str):
    photo_bytes = base64.b64decode(photo_b64)
    boundary = 'boundary123456'
    body = (
        f'--{boundary}\r\n'
        f'Content-Disposition: form-data; name="chat_id"\r\n\r\n'
        f'{chat_id}\r\n'
        f'--{boundary}\r\n'
        f'Content-Disposition: form-data; name="caption"\r\n\r\n'
        f'{caption}\r\n'
        f'--{boundary}\r\n'
        f'Content-Disposition: form-data; name="photo"; filename="photo.jpg"\r\n'
        f'Content-Type: image/jpeg\r\n\r\n'
    ).encode() + photo_bytes + f'\r\n--{boundary}--\r\n'.encode()

    req = urllib.request.Request(
        f'https://api.telegram.org/bot{bot_token}/sendPhoto',
        data=body,
        headers={'Content-Type': f'multipart/form-data; boundary={boundary}'},
        method='POST'
    )
    with urllib.request.urlopen(req) as resp:
        resp.read()


def handler(event: dict, context) -> dict:
    """Отправка заявки и фото с сайта химчистки в Telegram"""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token, X-Session-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    phone = body.get('phone', '').strip()
    name = body.get('name', '').strip()
    comment = body.get('comment', '').strip()
    source = body.get('source', 'Форма')
    photos = body.get('photos', [])

    if not phone:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Телефон обязателен'}, ensure_ascii=False)
        }

    lines = [f'📋 *Новая заявка — {source}*', f'📞 Телефон: {phone}']
    if name:
        lines.append(f'👤 Имя: {name}')
    if comment:
        lines.append(f'💬 Комментарий: {comment}')
    if photos:
        lines.append(f'📸 Фото: {len(photos)} шт.')

    text = '\n'.join(lines)

    bot_token = os.environ['TELEGRAM_BOT_TOKEN']
    chat_id = os.environ['TELEGRAM_CHAT_ID']

    if photos:
        send_photo(bot_token, chat_id, photos[0], text)
        for photo_b64 in photos[1:]:
            send_photo(bot_token, chat_id, photo_b64, '')
    else:
        send_message(bot_token, chat_id, text)

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True})
    }
