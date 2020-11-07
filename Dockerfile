FROM python:3.8

RUN pip3 install pipenv

ENV PROJECT_DIR /usr/src/api

WORKDIR ${PROJECT_DIR}

COPY Pipfile .
COPY Pipfile.lock .
COPY requirements.txt .
COPY main.py .

RUN pipenv install -r ./requirements.txt --deploy

EXPOSE 5000

CMD ["pipenv", "run", "python", "main.py"]