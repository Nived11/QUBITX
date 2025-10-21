import {
  CheckCircle2,
  InfoIcon,
  Loader2,
  XCircle,
  AlertTriangle,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      position="top-right"
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CheckCircle2 className="h-6 w-6 text-green-700" />,
        info: <InfoIcon className="h-6 w-6 text-blue-700" />,
        warning: <AlertTriangle className="h-6 w-6 text-orange-700" />,
        error: <XCircle className="h-6 w-6 text-red-700" />,
        loading: <Loader2 className="h-6 w-6 animate-spin text-blue-900" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-gray-900 group-[.toaster]:border group-[.toaster]:border-blue-100 group-[.toaster]:shadow-xl group-[.toaster]:rounded-xl group-[.toaster]:backdrop-blur-sm group-[.toaster]:py-4 group-[.toaster]:px-5",
          description: "group-[.toast]:text-gray-900 group-[.toast]:text-sm group-[.toast]:mt-1",
          actionButton:
            "group-[.toast]:bg-blue-800 group-[.toast]:text-white group-[.toast]:hover:bg-blue-900 group-[.toast]:rounded-lg group-[.toast]:font-medium group-[.toast]:px-4 group-[.toast]:transition-colors",
          cancelButton:
            "group-[.toast]:bg-gray-100 group-[.toast]:text-gray-900 group-[.toast]:hover:bg-gray-200 group-[.toast]:rounded-lg group-[.toast]:font-medium group-[.toast]:px-4 group-[.toast]:transition-colors",
          title: "group-[.toast]:text-gray-900 group-[.toast]:font-semibold group-[.toast]:text-base",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }