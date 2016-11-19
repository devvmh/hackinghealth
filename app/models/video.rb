class Video < ApplicationRecord
  has_one :user
  has_attached_file :file,
    styles: {
      thumb: {
        geometry: '100x100#',
        :format => 'jpg',
        :time => 10
      },
      medium: {
        geometry: "300x300#",
        format: 'jpg',
        time: 10
      }
    },
    processors: [ :transcoder ]
  validates_attachment_content_type :file, content_type: /\Avideo/
end
