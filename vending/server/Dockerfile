FROM rust:slim-buster
RUN apt-get -y update
RUN apt-get install -y sudo

RUN adduser --disabled-password --gecos '' admin
RUN adduser admin sudo
RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers
RUN chown -R admin /home/admin

USER admin

RUN sudo apt-get install -y python3 make build-essential libssl-dev zlib1g-dev libbz2-dev \
    libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev libudev-dev libncursesw5-dev \
    xz-utils tk-dev python3-pip libffi-dev liblzma-dev python-openssl git && \
    curl https://pyenv.run | bash && \
    curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python3

RUN pip3 install -U Flask

ENV HOME /home/admin
ENV PYENV_ROOT $HOME/.pyenv
ENV POETRY_ROOT $HOME/.poetry
ENV CARGO_ROOT /usr/local/cargo
ENV PATH $PYENV_ROOT/shims:$PYENV_ROOT/bin:$PATH
ENV PATH $POETRY_ROOT/bin:$PATH
ENV PATH $CARGO_ROOT/bin:$PATH

RUN cargo install solana-cli
RUN cargo install spl-token-cli
RUN solana config set --url https://devnet.solana.com
RUN pip3 install -U flask-cors
WORKDIR $HOME
COPY solana3.py $HOME/solana3.py

# Copy keypair
COPY solana.json $HOME/solana.json
RUN sudo chmod 755 $HOME/solana.json
RUN solana config set --keypair $HOME/solana.json

EXPOSE 8000

CMD ["python3","solana.py"]
