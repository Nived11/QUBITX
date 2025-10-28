import { useState, type ChangeEvent } from "react";
import { toast } from "sonner";
import api from "../../../../api/axios";

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

export const useAddProduct = (onSuccess?: () => void) => {
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
  const [mainImagePreviews, setMainImagePreviews] = useState<string[]>([]);
  const [colorVariantPreviews, setColorVariantPreviews] = useState<string[][]>([]);

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
    const remainingSlots = 5 - formData.mainImages.length;
    
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
    setFormData((prev) => ({
      ...prev,
      mainImages: prev.mainImages.filter((_, i) => i !== index),
    }));
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
    setFormData((prev) => ({
      ...prev,
      colorVariants: prev.colorVariants.filter((_, i) => i !== index),
    }));
    setColorVariantPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleColorNameChange = (index: number, value: string) => {
    const newVariants = [...formData.colorVariants];
    newVariants[index].colorName = value;
    setFormData((prev) => ({ ...prev, colorVariants: newVariants }));
  };

  const handleColorImagesChange = (index: number, files: FileList | null) => {
    if (!files) return;
    const fileArray = Array.from(files);
    const currentImages = formData.colorVariants[index].images;
    const remainingSlots = 5 - currentImages.length;
    
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
    const newVariants = [...formData.colorVariants];
    newVariants[variantIndex].images = newVariants[variantIndex].images.filter(
      (_, i) => i !== imageIndex
    );
    setFormData((prev) => ({ ...prev, colorVariants: newVariants }));

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
      setLoading(true);

      // Validation
      if (!formData.name || !formData.actualPrice || !formData.category || 
          !formData.brand || !formData.description || !formData.stock) {
        toast.error("Please fill all required fields");
        return;
      }

      if (formData.mainImages.length === 0) {
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

      const res = await api.post("/products/add", data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      toast.success(res.data.message || "Product added successfully");
      
      // Reset form
      setFormData({
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
      setMainImagePreviews([]);
      setColorVariantPreviews([]);

      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error("Failed to add product:", error);
      const errorMessage = error.response?.data?.message || "Failed to add product";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
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
  };
};