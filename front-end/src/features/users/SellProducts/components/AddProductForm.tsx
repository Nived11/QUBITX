import { useAddProduct } from "../hooks/useAddProduct";
import { Plus, Upload, Trash2, Package } from "lucide-react";
import { getSpecificationsByCategory } from "@/constants/categorySpecifications";
import { Spinner } from "@/components/ui/spinner";
import ProductFormSkeleton from "./ProductFormSkeleton";

const AddProductForm = ({ onClose, productId }: { onClose: () => void; productId?: string }) => {
  const {
    formData,
    loading,
    addLoading,
    mainImagePreviews,
    colorVariantPreviews,
    handleChange,
    handleHighlightChange,
    addWhychoose,
    removeWhychoose,
    handleSpecificationChange,
    addSpecification,
    removeSpecification,
    handleMainImagesChange,
    removeMainImage,
    addColorVariant,
    removeColorVariant,
    handleColorNameChange,
    handleColorImagesChange,
    removeColorVariantImage,
    handleSubmit,
    isEditMode,
  } = useAddProduct(onClose, productId);

  const availableSpecs = getSpecificationsByCategory(formData.category);
  const title = isEditMode ? "Edit Product" : "Add New Product";
  const buttonText = isEditMode ? (addLoading ? "Updating..." : "Update Product") : (addLoading ? "Adding..." : "Add Product");

  return (
    <div className="max-h-[100vh] bg-gray-50 p-2 sm:p-4 overflow-y-auto scrollbar-hide">
      {/* Header */}
      <div>
        <div className="max-w-7xl mx-auto">
          <span className="flex align-center">
            <button
              onClick={onClose}
              className="flex items-center gap-1 sm:gap-2 text-blue-800 font-semibold transition-colors mb-3 sm:mb-4 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-white/20 text-sm sm:text-base"
            >
              <span className="inline-flex gap-0.5 animate-arrowSlide">
                <span className="inline-block transform transition-transform group-hover:translate-x-1">
                  &lt;
                </span>
                <span className="inline-block transform transition-transform group-hover:translate-x-1 animation-delay-75">
                  &lt;
                </span>
              </span>{" "}
              Back
            </button>
          </span>
          <div className="flex items-center gap-3 text-blue-800">
            <div className="bg-white/20 p-2 sm:p-3 rounded-lg">
              <Package size={24} className="sm:w-7 sm:h-7" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
                {title}
              </h1>
              <p className="text-xs sm:text-sm mt-0.5 sm:mt-1">
                Fill in the details below to list your product
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      {
        loading ? (
          < ProductFormSkeleton />
        ) : (

          <div className="mt-4 sm:mt-6">
            <div className="space-y-4 sm:space-y-6">
              {/* Basic Information */}
              <section className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                <h3 className="text-lg sm:text-xl font-bold text-blue-800 flex items-center gap-2 sm:gap-3 border-b-2 border-blue-800/50 pb-2 sm:pb-3">
                  Basic Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                      Product Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:ring-1 focus:ring-blue-800 focus:border-blue-500 outline-none transition-all"
                      placeholder="e.g., iPhone 15 Pro Max"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                      Brand <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:ring-1 focus:ring-blue-800 focus:border-blue-500 outline-none transition-all"
                      placeholder="e.g., Apple"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:ring-1 focus:ring-blue-800 focus:border-blue-500 outline-none transition-all bg-white"
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="Smartphones">Smartphones</option>
                      <option value="Headphones">Headphones</option>
                      <option value="Laptops">Laptops </option>
                      <option value="SmartWatches">Smart Watches</option>
                      <option value="Speakers">Speakers</option>
                      <option value="Cameras">Cameras</option>
                      <option value="Gaming">Gaming</option>
                      <option value="Tablets">Tablets</option>
                      <option value="SmartHome">Smart Home</option>
                      <option value="Printers">Printers</option>
                      <option value="Earbuds">Earbuds</option>
                      <option value="Accessories">Accessories</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                      Warranty
                    </label>
                    <input
                      type="Number"
                      name="warranty"
                      value={formData.warranty}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:ring-1 focus:ring-blue-800 focus:border-blue-500 outline-none transition-all"
                      placeholder="e.g., 1 Year Manufacturer Warranty"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                      Actual Price <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="actualPrice"
                      value={formData.actualPrice}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:ring-1 focus:ring-blue-800 focus:border-blue-500 outline-none transition-all"
                      placeholder="e.g., 999.99"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                      Discount Percentage
                    </label>
                    <input
                      type="number"
                      name="discountPercentage"
                      value={formData.discountPercentage}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:ring-1 focus:ring-blue-800 focus:border-blue-500 outline-none transition-all"
                      placeholder="e.g., 15"
                      min="0"
                      max="100"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                      Stock Quantity <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:ring-1 focus:ring-blue-800 focus:border-blue-500 outline-none transition-all"
                      placeholder="e.g., 100"
                      min="0"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:ring-1 focus:ring-blue-800 focus:border-blue-500 outline-none transition-all resize-none"
                    rows={4}
                    placeholder="Detailed product description..."
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                    Product color <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:ring-1 focus:ring-blue-800 focus:border-blue-500 outline-none transition-all"
                    placeholder="e.g., blue"

                    required
                  />
                </div>

                {/* Main Images */}
                <h3 className="text-lg sm:text-xl font-bold text-blue-800 flex items-center gap-2 sm:gap-3 border-b-2 border-blue-800/50 pb-2 sm:pb-3">
                  Product Images (Max 5)
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
                  {mainImagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 sm:h-40 object-cover rounded-lg border-2 border-gray-300 shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => removeMainImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 sm:p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                      >
                        <Trash2 size={14} className="sm:w-4 sm:h-4" />
                      </button>
                      <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded font-medium">
                        {index + 1}
                      </div>
                    </div>
                  ))}

                  {mainImagePreviews.length < 5 && (
                    <label className="w-full h-32 sm:h-40 border-2 border-dashed border-blue-800 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-600 hover:bg-blue-50 transition-all bg-white">
                      <Upload
                        size={24}
                        className="sm:w-8 sm:h-8 text-blue-700 mb-1 sm:mb-2"
                      />
                      <span className="text-xs sm:text-sm text-blue-800 font-semibold">
                        Upload
                      </span>
                      <span className="text-xs text-gray-500 mt-0.5 sm:mt-1">
                        {5 - mainImagePreviews.length} left
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleMainImagesChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                <div className="flex items-center justify-between border-b-2 border-blue-800/50 pb-2 sm:pb-3">
                  <h3 className="text-lg sm:text-xl font-bold text-blue-800 flex items-center gap-2 sm:gap-3">
                    Why Choose This? (Max 5)
                  </h3>
                  {formData.whychoose.length < 5 && (
                    <button
                      type="button"
                      onClick={addWhychoose}
                      className="flex items-center gap-1 sm:gap-2 bg-gradient-to-br from-blue-600 to-blue-800 text-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-blue-700 text-xs sm:text-sm font-semibold transition-colors shadow-sm"
                    >
                      <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />{" "}
                      <span className="hidden sm:inline">Add</span>
                    </button>
                  )}
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {formData.whychoose.map((highlight, index) => (
                    <div key={index} className="flex gap-2 sm:gap-3 items-center">
                      <span className="text-base sm:text-lg font-semibold text-blue-800">
                        {"*"}
                      </span>
                      <input
                        type="text"
                        value={highlight}
                        onChange={(e) =>
                          handleHighlightChange(index, e.target.value)
                        }
                        className="flex-1 border-2 border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:ring-1 focus:ring-blue-800 focus:border-blue-500 outline-none transition-all"
                        placeholder="e.g., Superior battery life"
                        required
                      />
                      {formData.whychoose.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeWhychoose(index)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 sm:p-3 rounded-lg transition-all"
                        >
                          <Trash2 size={18} className="sm:w-5 sm:h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between border-b-2 border-blue-800/50 pb-2 sm:pb-3">
                  <h3 className="text-lg sm:text-xl font-bold text-blue-800 flex items-center gap-2 sm:gap-3">
                    Specifications
                  </h3>
                  <button
                    type="button"
                    onClick={addSpecification}
                    className="flex items-center gap-1 sm:gap-2 bg-gradient-to-br from-blue-600 to-blue-800 text-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-blue-700 text-xs sm:text-sm font-semibold transition-colors shadow-sm"
                  >
                    <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />{" "}
                    <span className="hidden sm:inline">Add</span>
                  </button>
                </div>

                {formData.category ? (
                  <div className="space-y-3 sm:space-y-4">
                    {formData.specifications.map((spec, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row gap-2 sm:gap-3"
                      >
                        {/* Select + Input share equal width using flex-1 */}
                        <div className="flex flex-col sm:flex-row w-full gap-2 sm:gap-3">
                          <select
                            value={spec.label}
                            onChange={(e) =>
                              handleSpecificationChange(
                                index,
                                "label",
                                e.target.value
                              )
                            }
                            className="flex-1 border-2 border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:ring-1 focus:ring-blue-800 focus:border-blue-500 outline-none transition-all bg-white"
                          >
                            <option value="">Select Specification</option>
                            {availableSpecs.map((specOption) => (
                              <option
                                key={specOption.label}
                                value={specOption.label}
                              >
                                {specOption.label}
                              </option>
                            ))}
                          </select>

                          <div className="flex items-center flex-1 gap-2 sm:gap-3">
                            <input
                              type="text"
                              value={spec.value}
                              onChange={(e) =>
                                handleSpecificationChange(
                                  index,
                                  "value",
                                  e.target.value
                                )
                              }
                              className="flex-1 border-2 border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:ring-1 focus:ring-blue-800 focus:border-blue-500 outline-none transition-all"
                              placeholder="Value (e.g., 8GB)"
                            />

                            {formData.specifications.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeSpecification(index)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 sm:p-3 rounded-lg transition-all"
                              >
                                <Trash2 size={18} className="sm:w-5 sm:h-5" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-red-600 text-xs sm:text-sm">
                    Please select a category first, then add specifications.
                  </p>
                )}

                <div className="flex items-center justify-between border-b-2 border-blue-800/50 pb-2 sm:pb-3">
                  <h3 className="text-lg sm:text-xl font-bold text-blue-800 flex items-center gap-2 sm:gap-3">
                    Color Variants
                  </h3>
                  <button
                    type="button"
                    onClick={addColorVariant}
                    className="flex items-center gap-1 sm:gap-2 bg-gradient-to-br from-blue-600 to-blue-800 text-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-blue-700 text-xs sm:text-sm font-semibold transition-colors shadow-sm"
                  >
                    <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />{" "}
                    <span className="hidden sm:inline">Add Color</span>
                  </button>
                </div>

                {formData.colorVariants.length > 0 ? (
                  <div className="space-y-4 sm:space-y-6">
                    {formData.colorVariants.map((variant, variantIndex) => {
                      // Calculate total images for this color variant
                      const totalImages = colorVariantPreviews[variantIndex]?.length || 0;
                      const canAddMore = totalImages < 5;

                      return (
                        <div
                          key={variantIndex}
                          className="border-2 border-blue-800/50 rounded-xl p-4 sm:p-6 space-y-4 sm:space-y-5 bg-gray-50"
                        >
                          <div className="flex items-center gap-2 sm:gap-3">
                            <input
                              type="text"
                              value={variant.colorName}
                              onChange={(e) =>
                                handleColorNameChange(variantIndex, e.target.value)
                              }
                              className="flex-1 border-2 border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:ring-1 focus:ring-blue-800 focus:border-blue-500 outline-none transition-all bg-white"
                              placeholder="Color name (e.g., Midnight Black)"
                            />
                            <button
                              type="button"
                              onClick={() => removeColorVariant(variantIndex)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 sm:p-3 rounded-lg transition-all"
                            >
                              <Trash2 size={20} className="sm:w-[22px] sm:h-[22px]" />
                            </button>
                          </div>

                          <div>
                            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                              Images for {variant.colorName || "this color"} (Max 5)
                            </label>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
                              {colorVariantPreviews[variantIndex]?.map(
                                (preview, imgIndex) => (
                                  <div key={imgIndex} className="relative group">
                                    <img
                                      src={preview}
                                      alt={`${variant.colorName} ${imgIndex + 1}`}
                                      className="w-full h-28 sm:h-32 object-cover rounded-lg border-2 border-gray-300 shadow-sm"
                                    />
                                    <button
                                      type="button"
                                      onClick={() =>
                                        removeColorVariantImage(variantIndex, imgIndex)
                                      }
                                      className="absolute -top-2 -right-2 bg-red-500 text-white p-1 sm:p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                                    >
                                      <Trash2
                                        size={12}
                                        className="sm:w-[14px] sm:h-[14px]"
                                      />
                                    </button>
                                    <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded font-medium">
                                      {imgIndex + 1}
                                    </div>
                                  </div>
                                )
                              )}

                              {canAddMore && (
                                <label className="w-full h-28 sm:h-32 border-2 border-dashed border-blue-800 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-800 hover:bg-blue-50 transition-all bg-white">
                                  <Upload
                                    size={20}
                                    className="sm:w-6 sm:h-6 text-blue-700"
                                  />
                                  <span className="text-xs text-blue-700 font-semibold mt-1">
                                    Upload
                                  </span>
                                  <span className="text-xs text-gray-500 mt-0.5 sm:mt-1">
                                    {5 - totalImages} left
                                  </span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={(e) =>
                                      handleColorImagesChange(variantIndex, e.target.files)
                                    }
                                    className="hidden"
                                  />
                                </label>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 sm:py-12 text-gray-500">
                    <Package
                      size={44}
                      className="sm:w-14 sm:h-14 mx-auto mb-2 sm:mb-3 opacity-30"
                    />
                    <p className="text-sm sm:text-base">
                      No color variants added yet
                    </p>
                    <p className="text-xs sm:text-sm mt-1">
                      Click "Add Color" to add product variants
                    </p>
                  </div>
                )}
              </section>

              {/* Submit Buttons */}
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={addLoading}
                    className="flex items-center justify-center gap-2 bg-gradient-to-br from-blue-600 to-blue-900 text-white px-8 sm:px-14 py-2.5 sm:py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-semibold text-sm sm:text-base disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
                  >
                    {addLoading ? (
                      <>
                        <Spinner />
                        <span>{isEditMode ? "Updating..." : "Adding..."}</span>
                      </>
                    ) : (
                      buttonText
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="bg-gray-200 text-gray-700 px-8 sm:px-14 py-2.5 sm:py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold text-sm sm:text-base shadow-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default AddProductForm;
