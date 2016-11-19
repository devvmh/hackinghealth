class VideosController < ApplicationController
  before_action :set_video, only: [:show, :edit, :update, :destroy]

  # GET /videos
  def index
    @videos = Video.all
    respond_to do |format|
      format.html
      format.json { render json: @videos || [] }
    end
  end

  # GET /videos/1
  def show
    respond_to do |format|
      format.html
      format.json { render json: @video }
    end
  end

  # GET /videos/new
  def new
    @video = Video.new
  end

  # GET /videos/1/edit
  def edit
  end

  # POST /videos
  def create
    @video = Video.new(video_params)

    if @video.save
      respond_to do |format|
        format.html { redirect_to @video, notice: 'Video was successfully created.' }
        format.json { render json: @video }
      end
    else
      render :new
    end
  end

  # PATCH/PUT /videos/1
  def update
    if @video.update(video_params)
      redirect_to @video, notice: 'Video was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /videos/1
  def destroy
    @video.destroy
    redirect_to videos_url, notice: 'Video was successfully destroyed.'
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_video
    @video = Video.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def video_params
    params.fetch(:video, {}).permit(:name, :file)
  end
end
