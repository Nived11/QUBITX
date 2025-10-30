import { useState, useEffect, type ChangeEvent } from "react";
import { toast } from "sonner";
import api from "../../../../api/axios";
import { extractErrorMessages } from "@/utils/helpers/extractErrorMessages";

interface Specification {
  label: string;
  value: string;
}

interface ColorVariant {
  colorName: string;
  images: File[];
}

interface ProductFormData {
  name: string;
  actualPrice: string;
  discountPercentage: string;
  category: string;
  brand: string;
  warranty: string;
  description: string;
  whychoose: string[];
  stock: string;
  specifications: Specification[];
  mainImages: File[];
  colorVariants: ColorVariant[];
}

export const useAddProduct = (onSuccess?: () => void, productId?: string) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    actualPrice: "",
    discountPercentage: "",
    category: "",
    brand: "",
    warranty: "",
    description: "",
    whychoose: [""],
    stock: "",
    specifications: [{ label: "", value: "" }],
    mainImages: [],
    colorVariants: [],
  });
  
  const [loading, setLoading] = useState(false);
  const [addLoading, setaddLoading] = useState(false);
  const [mainImagePreviews, setMainImagePreviews] = useState<string[]>([]);
  const [colorVariantPreviews, setColorVariantPreviews] = useState<string[][]>([]);
  const [existingMainImages, setExistingMainImages] = useState<string[]>([]);
  const [existingColorImages, setExistingColorImages] = useState<{[key: string]: string[]}>({});

  // Fetch product details if editing
  useEffect(() => {
    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/products/${productId}`, { withCredentials: true });
      const product = res.data;

      setFormData({
        name: product.name || "",
        actualPrice: product.actualPrice?.toString() || "",
        discountPercentage: product.discountPercentage?.toString() || "",
        category: product.category || "",
        brand: product.brand || "",
        warranty: product.warranty?.toString() || "",
        description: product.description || "",
        whychoose: product.whychoose?.length > 0 ? product.whychoose : [""],
        stock: product.stock?.toString() || "",
        specifications: product.specifications?.length > 0 ? product.specifications : [{ label: "", value: "" }],
        mainImages: [],
        colorVariants: product.colorVariants?.map((cv: any) => ({
          colorName: cv.colorName,
          images: []
        })) || [],
      });

      // Set existing image URLs for preview
      setExistingMainImages(product.images || []);
      setMainImagePreviews(product.images || []);

      // Set color variant images
      if (product.colorVariants) {
        const colorImgs: {[key: string]: string[]} = {};
        const colorPreviews: string[][] = [];
        
        product.colorVariants.forEach((cv: any) => {
          colorImgs[cv.colorName] = cv.images || [];
          colorPreviews.push(cv.images || []);
        });
        
        setExistingColorImages(colorImgs);
        setColorVariantPreviews(colorPreviews);
      }
    } catch (error: any) {
     toast.error(extractErrorMessages(error) || "Failed to fetch product details");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle whychoose
  const handleHighlightChange = (index: number, value: string) => {
    const newwhychoose = [...formData.whychoose];
    newwhychoose[index] = value;
    setFormData((prev) => ({ ...prev, whychoose: newwhychoose }));
  };

  const addWhychoose = () => {
    setFormData((prev) => ({ ...prev, whychoose: [...prev.whychoose, ""] }));
  };

  const removeWhychoose = (index: number) => {
    const newwhychoose = formData.whychoose.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, whychoose: newwhychoose }));
  };

  // Handle specifications
  const handleSpecificationChange = (index: number, field: "label" | "value", value: string) => {
    const newSpecs = [...formData.specifications];
    newSpecs[index][field] = value;
    setFormData((prev) => ({ ...prev, specifications: newSpecs }));
  };

  const addSpecification = () => {
    setFormData((prev) => ({
      ...prev,
      specifications: [...prev.specifications, { label: "", value: "" }],
    }));
  };

  const removeSpecification = (index: number) => {
    const newSpecs = formData.specifications.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, specifications: newSpecs }));
  };

  // Handle main images
  const handleMainImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const totalImages = formData.mainImages.length + existingMainImages.length;
    const remainingSlots = 5 - totalImages;
    
    if (files.length > remainingSlots) {
      toast.error(`You can only add ${remainingSlots} more image(s)`);
      return;
    }

    setFormData((prev) => ({ ...prev, mainImages: [...prev.mainImages, ...files] }));

    // Create previews
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMainImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeMainImage = (index: number) => {
    // Check if it's an existing image or new upload
    if (index < existingMainImages.length) {
      // Remove from existing images
      setExistingMainImages(prev => prev.filter((_, i) => i !== index));
    } else {
      // Remove from new uploads
      const newIndex = index - existingMainImages.length;
      setFormData((prev) => ({
        ...prev,
        mainImages: prev.mainImages.filter((_, i) => i !== newIndex),
      }));
    }
    setMainImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle color variants
  const addColorVariant = () => {
    setFormData((prev) => ({
      ...prev,
      colorVariants: [...prev.colorVariants, { colorName: "", images: [] }],
    }));
    setColorVariantPreviews((prev) => [...prev, []]);
  };

  const removeColorVariant = (index: number) => {
    const colorName = formData.colorVariants[index].colorName;
    setFormData((prev) => ({
      ...prev,
      colorVariants: prev.colorVariants.filter((_, i) => i !== index),
    }));
    setColorVariantPreviews((prev) => prev.filter((_, i) => i !== index));
    
    // Remove from existing color images if it exists
    if (existingColorImages[colorName]) {
      const newExisting = { ...existingColorImages };
      delete newExisting[colorName];
      setExistingColorImages(newExisting);
    }
  };

  const handleColorNameChange = (index: number, value: string) => {
    const newVariants = [...formData.colorVariants];
    newVariants[index].colorName = value;
    setFormData((prev) => ({ ...prev, colorVariants: newVariants }));
  };

  const handleColorImagesChange = (index: number, files: FileList | null) => {
    if (!files) return;
    const fileArray = Array.from(files);
    const colorName = formData.colorVariants[index].colorName;
    const existingCount = existingColorImages[colorName]?.length || 0;
    const currentImages = formData.colorVariants[index].images;
    const remainingSlots = 5 - currentImages.length - existingCount;
    
    if (fileArray.length > remainingSlots) {
      toast.error(`You can only add ${remainingSlots} more image(s) for this color`);
      return;
    }

    const newVariants = [...formData.colorVariants];
    newVariants[index].images = [...currentImages, ...fileArray];
    setFormData((prev) => ({ ...prev, colorVariants: newVariants }));

    // Create previews
    fileArray.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setColorVariantPreviews((prev) => {
          const newPreviews = [...prev];
          if (!newPreviews[index]) newPreviews[index] = [];
          newPreviews[index] = [...newPreviews[index], reader.result as string];
          return newPreviews;
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const removeColorVariantImage = (variantIndex: number, imageIndex: number) => {
    const colorName = formData.colorVariants[variantIndex].colorName;
    const existingCount = existingColorImages[colorName]?.length || 0;

    if (imageIndex < existingCount) {
      // Remove from existing images
      const newExisting = { ...existingColorImages };
      newExisting[colorName] = newExisting[colorName].filter((_, i) => i !== imageIndex);
      setExistingColorImages(newExisting);
    } else {
      // Remove from new uploads
      const newIndex = imageIndex - existingCount;
      const newVariants = [...formData.colorVariants];
      newVariants[variantIndex].images = newVariants[variantIndex].images.filter(
        (_, i) => i !== newIndex
      );
      setFormData((prev) => ({ ...prev, colorVariants: newVariants }));
    }

    setColorVariantPreviews((prev) => {
      const newPreviews = [...prev];
      newPreviews[variantIndex] = newPreviews[variantIndex].filter(
        (_, i) => i !== imageIndex
      );
      return newPreviews;
    });
  };

  // Submit form
  const handleSubmit = async () => {
    try {
      setaddLoading(true);

      // Validation
      if (!formData.name || !formData.actualPrice || !formData.category || 
          !formData.brand || !formData.description || !formData.stock) {
        toast.error("Please fill all required fields");
        return;
      }

      if (formData.mainImages.length === 0 && existingMainImages.length === 0) {
        toast.error("Please upload at least one main image");
        return;
      }

      // Create FormData
      const data = new FormData();
      data.append("name", formData.name);
      data.append("actualPrice", formData.actualPrice);
      data.append("discountPercentage", formData.discountPercentage || "0");
      data.append("category", formData.category);
      data.append("brand", formData.brand);
      data.append("warranty", formData.warranty);
      data.append("description", formData.description);
      data.append("stock", formData.stock);

      // Append arrays as JSON strings
      data.append("whychoose", JSON.stringify(formData.whychoose.filter(h => h.trim() !== "")));
      data.append("specifications", JSON.stringify(formData.specifications.filter(s => s.label && s.value)));

      // Append existing images (for edit mode)
      if (productId) {
        data.append("existingMainImages", JSON.stringify(existingMainImages));
        data.append("existingColorImages", JSON.stringify(existingColorImages));
      }

      // Append main images
      formData.mainImages.forEach((file) => {
        data.append("mainImages", file);
      });

      // Append color variants
      const colorNames = formData.colorVariants
        .filter(cv => cv.colorName.trim() !== "")
        .map(cv => cv.colorName);
      
      data.append("colorVariants", JSON.stringify(colorNames));

      formData.colorVariants.forEach((variant) => {
        if (variant.colorName.trim() !== "") {
          variant.images.forEach((file) => {
            data.append(`${variant.colorName}Images`, file);
          });
        }
      });

      const endpoint = productId ? `/products/update/${productId}` : "/products/add";
      const method = productId ? "put" : "post";

      const res = await api[method](endpoint, data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      toast.success(res.data.message || `Product ${productId ? 'updated' : 'added'} successfully`);
      
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error(`Failed to ${productId ? 'update' : 'add'} product:`, error);
      const errorMessage = error.response?.data?.message || `Failed to ${productId ? 'update' : 'add'} product`;
      toast.error(errorMessage);
    } finally {
      setaddLoading(false);
    }
  };

  return {
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
    isEditMode: !!productId,
  };
};