# 📦 QA Task Manager — Прогресс проекта

> Последнее обновление: 31.10.2025

---

## 🧭 Сводка

### 🔧 Технологии

| Компонент      | Технология               |
|----------------|--------------------------|
| Backend        | NestJS + Prisma ORM      |
| База данных    | PostgreSQL (Docker)      |
| Frontend       | Next.js (React, TypeScript) |
| UI стилизация  | (Tailwind/MUI — в планах) |
| Тесты API/UI   | Postman + Playwright     |
| CI/CD          | GitHub Actions (в планах) |

---

## ✅ Что реализовано

### 📁 Backend (`/backend`)
- ✅ NestJS проект и структура
- ✅ Prisma ORM:
  - `schema.prisma` с моделями `User`, `Task`
  - `PrismaService` + модуль
  - Миграции выполнены
- ✅ PostgreSQL через `docker-compose`
- ✅ .env с `DATABASE_URL`
- ✅ CRUD (задачи): GET, POST работают
- ✅ Postman проверки
- ✅ Один тестовый юзер и задача созданы

---

### 🖥️ Frontend (`/frontend`)
- ✅ Инициализация через `create-next-app`
- ✅ Pages Router
- ✅ Готова базовая структура: `pages/`, `styles/`, `api/`, `public/`
- 🚫 Пока нет подключённого UI или компонентов задач

---

## 🧪 План действий

### 🔨 UI задач
- [ ] Вывод списка задач (GET `/tasks`)
- [ ] Создание задачи
- [ ] Удаление задачи
- [ ] Редактирование задачи

### 🔐 Авторизация
- [ ] Регистрация / логин (JWT)
- [ ] Protected routes на frontend
- [ ] Хранение токена

### 🧪 Тесты
- [ ] Playwright UI-тесты
- [ ] Postman API-тесты
- [ ] Newman сборка

### ⚙️ CI/CD
- [ ] GitHub Actions workflow

---

## 📁 Рекомендации

Сохрани этот файл как `progress.md` в корне проекта.  
Если будешь продолжать работу в новом чате — вставь его и напиши:

