FROM python:3.13-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

RUN apt-get update && apt-get install -y \
    gcc \
    libmariadb-dev-compat \
    libmariadb-dev \
    pkg-config \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY ../requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . .

# RUN python manage.py collectstatic --noinput
COPY entrypoint.sh /app/entrypoint.sh
ENTRYPOINT ["/app/entrypoint.sh"]
# CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8080"]