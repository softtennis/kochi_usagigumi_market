class ItemsController < ApplicationController
  def index

    @new_items = Item.last(5)
    @ladies_items = Item.ladies_items_search(1).last(5)

  end

  def new
    @item = Item.new
    @item_image = @item.item_images.new
  end

  def create
    @item = Item.new(item_params)
    if @item.valid? && @item.save
      redirect_to root_path
    else
      @item.item_images.new
      render :new and return
    end
  end

  def update

  end

  def show
    @item = Item.find(params[:id])
    @image = ItemImage.where(params[:id])
    @category = Category.where(ancestry:nil)
    @categoryParent = Category.find(Item.parentCategory(@item.category))
    @itemlist = Item.all
    @items = Item.categorySRC(@item.category).last(3)
  end

  def buy
  end

  private

  def item_params
    params.require(:item).permit(:name, :price, :introduction, :prefecture_id,
    :category_id, :item_condition_id, :postage_payer_id,
    :preparation_day_id, item_images_attributes: [:image_url]).merge(user_id: current_user.id)
  end

end
