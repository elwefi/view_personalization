class Model < ActiveRecord::Base

  after_save :change_default_model, :if => Proc.new { |model| model.basic_changed? && model.basic }
  
  private
  def change_default_model
      model = Model.where("id != ? AND basic = ?", self.id, true).first
      model.update_attribute(:basic,false) if model
  end

end
