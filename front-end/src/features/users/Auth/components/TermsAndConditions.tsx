import React from "react";
import { X, Shield, ShoppingCart, CreditCard, Truck, CheckCircle2, UserCheck, Lock, FileText, Mail } from "lucide-react";

interface TermsAndConditionsProps {
  onClose: () => void;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Elegant Header */}
        <div className="relative bg-blue-700 p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm p-3 rounded-xl">
                <FileText className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Terms & Conditions</h2>
                <p className="text-blue-100 text-sm mt-1">Qubitx</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-all"
            >
              <X size={24} />
            </button>
          </div>

          <div className="mt-4 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3 border border-white border-opacity-20">
            <p className="text-xs text-white font-medium">
              📅 Last Updated: October 19, 2025
            </p>
          </div>
        </div>

        {/* Content with Clean Cards */}
        <div className="overflow-y-auto p-6 space-y-4 bg-gray-50">
          {/* Introduction Card */}
          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 hover:border-blue-300 transition-all">
            <div className="flex items-start gap-3">
              <div className="bg-blue-50 p-2.5 rounded-lg flex-shrink-0">
                <Shield className="text-blue-700" size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-2"> Introduction & Account</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  By using Qubitx, you agree to these terms. You must be 18+ years old and provide accurate information during registration. Keep your account credentials secure.
                </p>
              </div>
            </div>
          </div>

          {/* Products Card */}
          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 hover:border-blue-300 transition-all">
            <div className="flex items-start gap-3">
              <div className="bg-blue-50 p-2.5 rounded-lg flex-shrink-0">
                <ShoppingCart className="text-blue-700" size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-2"> Products & Pricing</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We strive for accurate product information. Prices and availability are subject to change. We reserve the right to limit quantities and discontinue products at any time.
                </p>
              </div>
            </div>
          </div>

          {/* Payment Card */}
          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 hover:border-blue-300 transition-all">
            <div className="flex items-start gap-3">
              <div className="bg-blue-50 p-2.5 rounded-lg flex-shrink-0">
                <CreditCard className="text-blue-700" size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-2"> Orders & Payment</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Payment required before processing. We accept major credit/debit cards through secure channels. Orders are subject to acceptance and we may refuse or cancel any order.
                </p>
              </div>
            </div>
          </div>

          {/* Shipping Card */}
          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 hover:border-blue-300 transition-all">
            <div className="flex items-start gap-3">
              <div className="bg-blue-50 p-2.5 rounded-lg flex-shrink-0">
                <Truck className="text-blue-700" size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-2"> Shipping & Delivery</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Delivery times are estimates. You're responsible for accurate shipping information. International orders may incur customs fees. We're not liable for carrier delays.
                </p>
              </div>
            </div>
          </div>

          {/* Returns Card */}
          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 hover:border-blue-300 transition-all">
            <div className="flex items-start gap-3">
              <div className="bg-blue-50 p-2.5 rounded-lg flex-shrink-0">
                <CheckCircle2 className="text-blue-700" size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-2"> Returns & Refunds</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  30-day return policy for unused items in original packaging. Return shipping costs are your responsibility unless defective. Refunds processed within 5-10 business days.
                </p>
              </div>
            </div>
          </div>

          {/* User Conduct Card */}
          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 hover:border-blue-300 transition-all">
            <div className="flex items-start gap-3">
              <div className="bg-blue-50 p-2.5 rounded-lg flex-shrink-0">
                <UserCheck className="text-blue-700" size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-2"> User Conduct</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Do not use our platform for illegal activities, attempt unauthorized access, post harmful content, or violate applicable laws. We reserve the right to terminate accounts.
                </p>
              </div>
            </div>
          </div>

          {/* Liability Card */}
          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 hover:border-blue-300 transition-all">
            <div className="flex items-start gap-3">
              <div className="bg-blue-50 p-2.5 rounded-lg flex-shrink-0">
                <Shield className="text-blue-700" size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-2"> Limitation of Liability</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Qubitx is not liable for indirect or consequential damages. Our total liability is limited to the amount you paid for the product or service.
                </p>
              </div>
            </div>
          </div>

          {/* Privacy & Changes - Combined */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 hover:border-blue-300 transition-all">
              <div className="flex items-start gap-3">
                <div className="bg-blue-50 p-2.5 rounded-lg flex-shrink-0">
                  <Lock className="text-blue-700" size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-2"> Privacy</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Your data is protected per our Privacy Policy.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 hover:border-blue-300 transition-all">
              <div className="flex items-start gap-3">
                <div className="bg-blue-50 p-2.5 rounded-lg flex-shrink-0">
                  <FileText className="text-blue-700" size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-2"> Changes</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Terms may be modified. Continued use means acceptance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Card */}
          <div className="bg-white rounded-lg p-5 shadow-sm border border-blue-200">
            <div className="flex items-start gap-3">
              <div className="bg-blue-700 p-2.5 rounded-lg flex-shrink-0">
                <Mail className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-2">. Contact Us</h3>
                <div className="space-y-1 text-sm text-gray-700">
                  <p><strong>Email:</strong> support@qubitx.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Acknowledgment */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 text-center">
            <p className="text-sm font-semibold text-blue-900">
              ✓ By using Qubitx, you acknowledge and agree to these Terms
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white p-5 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg text-sm"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;