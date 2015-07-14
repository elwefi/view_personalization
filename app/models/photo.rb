class Photo < ActiveRecord::Base
  default_scope {order('created_at ASC')}
  mount_uploader :image, PhotoUploader
end
