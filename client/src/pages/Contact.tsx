import React, { useState } from 'react';

// Interface untuk form data
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Interface untuk form errors
interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

// Function declaration untuk Contact component
export default function Contact(): React.JSX.Element {
  // State declarations
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Handle input change
  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  }

  // Validate form
  function validateForm(data: ContactFormData): FormErrors {
    const newErrors: FormErrors = {};

    if (!data.name.trim()) {
      newErrors.name = 'Nama wajib diisi';
    }

    if (!data.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    if (!data.subject.trim()) {
      newErrors.subject = 'Subjek wajib diisi';
    }

    if (!data.message.trim()) {
      newErrors.message = 'Pesan wajib diisi';
    } else if (data.message.trim().length < 10) {
      newErrors.message = 'Pesan minimal 10 karakter';
    }

    return newErrors;
  }

  // Handle form submit
  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      setSubmitStatus('idle');

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Here you would typically send data to your backend
        console.log('Form submitted:', formData);
        
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } catch (error) {
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8 mt-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text mb-6">
            Hubungi Kami
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Punya pertanyaan? Kirim pesan sekarang juga dan tim kami akan segera merespon!
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white/70 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📧</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600">hello@example.com</p>
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📱</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">Telepon</h3>
                  <p className="text-gray-600">+62 812 3456 7890</p>
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📍</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">Alamat</h3>
                  <p className="text-gray-600">
                    Jl. Contoh No. 123<br />
                    Jakarta, Indonesia 12120
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/80 backdrop-blur-xl p-8 lg:p-10 rounded-3xl shadow-2xl border border-white/50">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <p className="font-semibold text-green-800">
                        Terima kasih!
                      </p>
                      <p className="text-green-700 text-sm">
                        Pesan Anda telah terkirim. Kami akan segera membalas.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">❌</span>
                    <div>
                      <p className="font-semibold text-red-800">
                        Gagal Mengirim
                      </p>
                      <p className="text-red-700 text-sm">
                        Silakan coba lagi atau hubungi kami langsung.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Fields */}
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Nama Lengkap *"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`
                    w-full px-4 py-4 text-lg rounded-2xl border-2 bg-white/50 
                    backdrop-blur-sm transition-all duration-300 focus:outline-none 
                    focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500
                    hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed
                    ${errors.name ? 'border-red-400 bg-red-50/50' : 'border-gray-200 hover:border-gray-300'}
                  `}
                  disabled={isSubmitting}
                  required
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1 font-medium">{errors.name}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`
                    w-full px-4 py-4 text-lg rounded-2xl border-2 bg-white/50 
                    backdrop-blur-sm transition-all duration-300 focus:outline-none 
                    focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500
                    hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed
                    ${errors.email ? 'border-red-400 bg-red-50/50' : 'border-gray-200 hover:border-gray-300'}
                  `}
                  disabled={isSubmitting}
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 font-medium">{errors.email}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subjek *"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`
                    w-full px-4 py-4 text-lg rounded-2xl border-2 bg-white/50 
                    backdrop-blur-sm transition-all duration-300 focus:outline-none 
                    focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500
                    hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed
                    ${errors.subject ? 'border-red-400 bg-red-50/50' : 'border-gray-200 hover:border-gray-300'}
                  `}
                  disabled={isSubmitting}
                  required
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1 font-medium">{errors.subject}</p>
                )}
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder="Pesan Anda *"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`
                    w-full px-4 py-4 text-lg rounded-2xl border-2 bg-white/50 resize-vertical 
                    backdrop-blur-sm transition-all duration-300 focus:outline-none 
                    focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500
                    hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed
                    ${errors.message ? 'border-red-400 bg-red-50/50' : 'border-gray-200 hover:border-gray-300'}
                  `}
                  disabled={isSubmitting}
                  required
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1 font-medium">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`
                  w-full py-5 px-6 rounded-2xl font-semibold text-lg flex items-center 
                  justify-center gap-3 transition-all duration-300 group
                  ${isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-2xl hover:-translate-y-1 hover:shadow-blue-500/25 active:scale-95'
                  }
                  text-white shadow-xl
                `}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Mengirim...
                  </>
                ) : (
                  <>
                    Kirim Pesan
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}