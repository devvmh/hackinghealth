class HelloWorldController < ApplicationController
  def index
    @hello_world_props = { name: "Stranger", initialTab: 1 }
  end
end
