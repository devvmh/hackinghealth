class TeacherViewController < ApplicationController
  def index
    @teacherview_props = { name: 'Louise', initialTab: 1, signalmasterUrl: ENV['SIGNAL_SERVER_URL'] }
  end
end
