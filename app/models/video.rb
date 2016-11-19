class Video < ApplicationRecord
  has_one :user
  has_attached_file :file,
    styles: {
      thumb: {
        geometry: '100x100!',
        :format => 'jpg'
      }
    },
    processors: [ :transcoder ]
  validates_attachment_content_type :file, content_type: /\Avideo/

  def as_json(_options = {})
    super.merge(file_original_url: file.url, file_thumb_url: file.url(:thumb))
  end
end
