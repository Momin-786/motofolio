import React, { useState, useEffect } from "react";
import { 
  Mail, 
  Phone, 
  Github, 
  Linkedin, 
  Globe, 
  MapPin,
  Send,
  User,
  MessageSquare,
  Calendar,
  Clock,
  CheckCircle,
  ExternalLink,
  Copy,
  X,
  Star,
  Award,
  Code,
  Briefcase
} from "lucide-react";

const ContactApp = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState("");

  const contactInfo = [
    {
      id: 1,
      icon: Mail,
      label: "Email",
      value: "momina7863@gmail.com",
      link: "mailto:momina7863@gmail.com",
      color: "from-red-500 to-pink-500",
      description: "Best way to reach me for business inquiries"
    },
    {
      id: 2,
      icon: Phone,
      label: "Phone",
      value: "(+92) 319 424 3124",
      link: "tel:+923194243124",
      color: "from-green-500 to-emerald-500",
      description: "Available for calls during business hours"
    },
    {
      id: 3,
      icon: Github,
      label: "GitHub",
      value: "github.com/Momin-786",
      link: "https://github.com/Momin-786",
      color: "from-gray-600 to-gray-800",
      description: "Check out my open source projects"
    },
    {
      id: 4,
      icon: Linkedin,
      label: "LinkedIn",
      value: "/in/abdul-momin7863/",
      link: "https://linkedin.com/in/abdul-momin7863/",
      color: "from-blue-600 to-blue-800",
      description: "Professional network and experience"
    },
    {
      id: 5,
      icon: MapPin,
      label: "Location",
      value: "Gujranwala, Punjab, PK",
      link: null,
      color: "from-orange-500 to-red-500",
      description: "Available for remote work globally"
    }
  ];


  const availability = {
    status: "Available for new projects",
    nextAvailable: "Immediate start",
    timezone: "PKT (UTC+5)",
    workingHours: "Flexible"
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 2000);
  };

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(""), 2000);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 font-mono overflow-hidden">
      <div className="w-full h-full flex flex-col">
        
        {/* Header */}
        <div className="flex-shrink-0 bg-gray-900/95 backdrop-blur-md border-b border-gray-700/50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                
                Get In Touch
              </h1>
              <p className="text-gray-400 text-sm mt-1">Let's discuss your next project</p>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="p-4 space-y-6">
            
            {/* Availability Status */}
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <h2 className="text-green-400 font-semibold">{availability.status}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-gray-400">Next Available</div>
                  <div className="text-white font-medium">{availability.nextAvailable}</div>
                </div>
                <div>
                  <div className="text-gray-400">Timezone</div>
                  <div className="text-white font-medium">{availability.timezone}</div>
                </div>
                <div>
                  <div className="text-gray-400">Working Hours</div>
                  <div className="text-white font-medium">{availability.workingHours}</div>
                </div>
              </div>
            </div>

           

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Contact Information */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-white mb-4">Contact Information</h2>
                
                {contactInfo.map((contact) => {
                  const IconComponent = contact.icon;
                  return (
                    <div
                      key={contact.id}
                      className="group bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:border-gray-600/50 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${contact.color} flex-shrink-0`}>
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-medium text-white">{contact.label}</h3>
                            <div className="flex gap-2">
                              {contact.link && (
                                <a
                                  href={contact.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 hover:bg-gray-700/50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                >
                                  <ExternalLink className="w-3 h-3 text-gray-400" />
                                </a>
                              )}
                              <button
                                onClick={() => copyToClipboard(contact.value, contact.id)}
                                className="p-1.5 hover:bg-gray-700/50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                              >
                                {copiedField === contact.id ? (
                                  <CheckCircle className="w-3 h-3 text-green-400" />
                                ) : (
                                  <Copy className="w-3 h-3 text-gray-400" />
                                )}
                              </button>
                            </div>
                          </div>
                          <p className="text-gray-300 text-sm font-mono break-all">{contact.value}</p>
                          <p className="text-gray-500 text-xs mt-1">{contact.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Contact Form */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-white mb-4">Send Message</h2>
                
                {isSubmitted ? (
                  <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-8 text-center">
                    <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                    <h3 className="text-green-400 font-semibold text-lg mb-2">Message Sent!</h3>
                    <p className="text-gray-300 text-sm mb-4">
                      Thank you for reaching out. I'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-4 py-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-colors text-sm"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          <User className="w-4 h-4 inline mr-2" />
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
                          placeholder="Your name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          <Mail className="w-4 h-4 inline mr-2" />
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <MessageSquare className="w-4 h-4 inline mr-2" />
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
                        placeholder="Project inquiry, collaboration, etc."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <MessageSquare className="w-4 h-4 inline mr-2" />
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 resize-none"
                        placeholder="Tell me about your project, timeline, budget, or any questions you have..."
                      />
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                     className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-900 text-white rounded-lg hover:from-blue-600 hover:to-blue-950 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"

                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                )}
                
                <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
                  <h3 className="text-white font-medium mb-2">Response Time</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span>I typically respond within 24 hours</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300 mt-1">
                    <Calendar className="w-4 h-4 text-green-400" />
                    <span>Available for meetings Monday - Friday</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactApp;
export const displayContact = (props) => {
  return <ContactApp {...props} />;
}