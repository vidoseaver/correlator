class GraphController < ApplicationController
  def index
  end

  def data
    respond_to do |format|
      format.json {
        render :json =>
        [
          {"name": "Maria", "age": 30}
          {"name": "Fred", "age": 50}
          {"name": "Francis", "age": 12}
        ]
        # [1,2,3,4,5]
      }
    end
  end
end
