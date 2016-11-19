class Video < ApplicationRecord
  has_one :user
  has_attached_file :file,
    styles: lambda do |f|
      if f.instance.is_image?
        {
          small: 'x200>',
          medium: 'x300>',
          large: 'x400>'
        }
      else
        {
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
        }
      end
    end,
    processors: lambda do |f|
      f.is_video? ? [ :ffmpeg ] : [ :thumbnail ]
    end
end
