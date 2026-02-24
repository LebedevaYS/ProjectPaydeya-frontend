
# Paydeya Frontend

�������� ���������� ��� ������� Paydeya, ����������� �� React + Vite.

## ?? ��� ����� ���������� ����� �������

### 1. ���������� Git
- **Windows**: �������� � [git-scm.com](https://git-scm.com/) > ���������� ��� ������� ���������
- **Mac**: �������� Terminal > ������� `git` > �������� �����������
- **Linux**: �������� Terminal > ������� `sudo apt install git`

### 2. ���������� Node.js
- �������� LTS ������ � [nodejs.org](https://nodejs.org/)
- ���������� ��� ������� ���������
- **��������� ���������**: �������� Terminal > ������� `node --version` > ������ ��������� ������ Node.js

### 3. ���������� �������� ����
- **VS Code** 
- **Intelliji IDEA**
- ��� ����� ������ ��������

## ?? ������� �����

### ��������� ����������

```bash
# ������������ �����������
git clone https://github.com/LebedevaYS/ProjectPaydeya-frontend.git
cd ProjectPaydeya-frontend

# ��������� ������������
npm install

# ������ dev �������
npm run dev
```

���������� ����� �������� �� ������: http://localhost:5173

## ?? Git ������� (������� �������)

### ?? ������ ������ ��� ����� �����

```bash
# �������� �������� �����
git checkout main
git pull origin main

# ������� ����� ����� ��� ����
git checkout -b feature/��������-����
```

### ?? ���������� workflow

```bash
# ��������� ������ ���������
git status

# �������� ���������
git add .

# ������� ������ � �������� ����������
git commit -m "�������� ����� ���������"

# ��������� ���������
git push origin feature/��������-����
```
### ?? ���������� ���� � �������� � main
```
bash
# 1. �������� feature ����� � ���������� main
git fetch origin
git rebase origin/main

# 2. ������� Pull Request ����� GitHub ���������
# ��� ��������� ����� ��������:
git checkout main
git pull origin main
git merge feature/��������-����
git push origin main
```

### ?? ����������� ������� �������

```bash
# �������� ��������� ����� ��������
git diff

# ������ �������������������� ���������
git restore .

# ������ ���������� ������� (���������!)
git reset --soft HEAD~1
```