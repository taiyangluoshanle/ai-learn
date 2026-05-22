-- 用户学习进度表（与 auth.users 关联）
create table if not exists public.user_progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  completed_lessons text[] not null default '{}',
  completed_tasks jsonb not null default '{}',
  last_lesson_slug text,
  updated_at timestamptz not null default now()
);

alter table public.user_progress enable row level security;

create policy "用户可读自己的进度"
  on public.user_progress for select
  using (auth.uid() = user_id);

create policy "用户可插入自己的进度"
  on public.user_progress for insert
  with check (auth.uid() = user_id);

create policy "用户可更新自己的进度"
  on public.user_progress for update
  using (auth.uid() = user_id);

-- 新用户注册时可选：自动创建空进度行（也可在首次保存时 upsert）
create or replace function public.handle_new_user_progress()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.user_progress (user_id)
  values (new.id)
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_progress on auth.users;
create trigger on_auth_user_created_progress
  after insert on auth.users
  for each row execute function public.handle_new_user_progress();
