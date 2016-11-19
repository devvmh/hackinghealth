#install rvm + ruby
gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
\curl -sSL https://get.rvm.io | bash -s stable
rvm install ruby-2.3.2

# install homebrew + dependencies
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew install node ffmpeg imagemagick

# install app
git clone https://github.com/devvmh/hackinghealth.git
cd hackinghealth
gem install bundler
bundle install
npm install

# start servers
foreman start -f Procfile.dev
