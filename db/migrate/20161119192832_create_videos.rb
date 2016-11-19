class CreateVideos < ActiveRecord::Migration[5.0]
  def change
    create_table :videos do |t|
      t.references :user
      t.timestamps
    end

    add_attachment :videos, :file
  end
end
