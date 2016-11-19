class TeacherViewController < ApplicationController
  def index
    @teacherview_props = { name: 'Louise', initialTab: 1 }
  end
end
