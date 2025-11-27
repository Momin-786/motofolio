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
  const [contactInfo, setContactInfo] = useState([]);
  const [availability, setAvailability] = useState({
    status: "Available for new projects",
    nextAvailable: "Immediate start",
    timezone: "PKT (UTC+5)",
    workingHours: "Flexible"
  });

  // Fetch contact info from API
  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = async () => {
    try {
      const response = await fetch('/api/about');
      const data = await response.json();
      if (data.success && data.data) {
        // Filter contact type data
        const contactData = data.data.filter(item => item.type === 'contact');
        setContactInfo(contactData);
        
        // Get availability from about data if available
        const availabilityData = data.data.find(item => item.type === 'availability');
        if (availabilityData) {
          setAvailability(availabilityData);
        }
      }
    } catch (error) {
      console.error('Error fetching contact data:', error);
      setContactInfo([]);
    }
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
    <div className="w-full h-full bg-[#1E1E1E] font-['Ubuntu_Mono',monospace] overflow-hidden ubuntu-scrollbar">
      <div className="w-full h-full flex flex-col">
        
        {/* Ubuntu-style Header */}
        <div className="flex-shrink-0 bg-[#2D2D2D] border-b border-[#3D3D3D] p-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-base font-medium text-white" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>
                Get In Touch
              </h1>
              <p className="text-[#B3B3B3] text-xs mt-1" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>Let's discuss your next project</p>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="ubuntu-button p-1.5"
                style={{ padding: '4px 8px', minWidth: 'auto' }}
              >
                <X className="w-4 h-4 text-[#B3B3B3]" />
              </button>
            )}
          </div>
        </div>

        <div 
            className="flex-1 overflow-auto bg-[#1E1E1E] ubuntu-scrollbar"
            style={{
                transform: 'translateZ(0)',
                willChange: 'scroll-position',
                WebkitOverflowScrolling: 'touch',
                overscrollBehavior: 'contain'
            }}
        >
          <div className="p-4 space-y-4">
            
            {/* Availability Status - Ubuntu style */}
            {availability && (
              <div className="ubuntu-card p-3 border-[#4CAF50]/30">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-[#4CAF50] rounded-full" />
                  <h2 className="text-[#4CAF50] text-sm font-medium" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>
                    {availability.status || "Available for new projects"}
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <div className="text-[#808080] mb-1" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>Next Available</div>
                    <div className="text-white" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>
                      {availability.nextAvailable || "Immediate start"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[#808080] mb-1" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>Timezone</div>
                    <div className="text-white" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>
                      {availability.timezone || "PKT (UTC+5)"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[#808080] mb-1" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>Working Hours</div>
                    <div className="text-white" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>
                      {availability.workingHours || "Flexible"}
                    </div>
                  </div>
                </div>
              </div>
            )}

           

            {/* Two Column Layout - Responsive */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              
              {/* Contact Information - Ubuntu style */}
              <div className="space-y-3">
                <h2 className="text-sm font-medium text-white mb-3" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>Contact Information</h2>
                
                {contactInfo.length > 0 ? contactInfo.map((contact, index) => {
                  const iconMap = { Mail, Phone, Github, Linkedin, MapPin };
                  const IconComponent = typeof contact.icon === 'string' 
                    ? iconMap[contact.icon] || Mail 
                    : (contact.icon || Mail);

                  return (
                    <div
                      key={contact.id || contact._id || index}
                      className="ubuntu-list-item group"
                    >
                      <div className="w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                        <IconComponent className="w-5 h-5 text-[#E95420]" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-sm font-medium text-white" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>
                            {contact.label || contact.name}
                          </h3>
                          <div className="flex gap-1">
                            {(contact.link || contact.href) && (
                              <a
                                href={contact.link || contact.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1 hover:bg-[#3A3A3A] rounded opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <ExternalLink className="w-3 h-3 text-[#B3B3B3]" />
                              </a>
                            )}
                            <button
                              onClick={() => copyToClipboard(contact.value || contact.content || "", contact.id || contact._id || index)}
                              className="p-1 hover:bg-[#3A3A3A] rounded opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              {copiedField === (contact.id || contact._id || index) ? (
                                <CheckCircle className="w-3 h-3 text-[#4CAF50]" />
                              ) : (
                                <Copy className="w-3 h-3 text-[#B3B3B3]" />
                              )}
                            </button>
                          </div>
                        </div>
                        <p className="text-[#B3B3B3] text-xs break-all" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>
                          {contact.value || contact.content || ""}
                        </p>
                        {(contact.description || contact.desc) && (
                          <p className="text-[#808080] text-xs mt-1" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>
                            {contact.description || contact.desc}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                }) : (
                  <div className="text-center py-10">
                    <p className="text-[#808080]" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>No contact information available</p>
                  </div>
                )}
              </div>

              {/* Contact Form - Ubuntu style */}
              <div className="space-y-3">
                <h2 className="text-sm font-medium text-white mb-3" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>Send Message</h2>
                
                {isSubmitted ? (
                  <div className="ubuntu-card p-6 text-center border-[#4CAF50]/30">
                    <CheckCircle className="w-8 h-8 text-[#4CAF50] mx-auto mb-3" />
                    <h3 className="text-[#4CAF50] text-sm font-medium mb-2" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>Message Sent!</h3>
                    <p className="text-[#B3B3B3] text-xs mb-4" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>
                      Thank you for reaching out. I'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="ubuntu-button primary text-xs"
                      style={{ padding: '6px 12px' }}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                      <div>
                        <label className="block text-xs font-medium text-[#B3B3B3] mb-1" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>
                          <User className="w-3 h-3 inline mr-1" />
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="ubuntu-input"
                          placeholder="Your name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-[#B3B3B3] mb-1" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>
                          <Mail className="w-3 h-3 inline mr-1" />
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="ubuntu-input"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#B3B3B3] mb-1" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>
                        <MessageSquare className="w-3 h-3 inline mr-1" />
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="ubuntu-input"
                        placeholder="Project inquiry, collaboration, etc."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#B3B3B3] mb-1" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>
                        <MessageSquare className="w-3 h-3 inline mr-1" />
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="ubuntu-input resize-none"
                        placeholder="Tell me about your project, timeline, budget, or any questions you have..."
                      />
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="ubuntu-button primary w-full flex items-center justify-center gap-2 text-sm"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-3 h-3" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                )}
                
                <div className="ubuntu-card p-3">
                  <h3 className="text-xs font-medium text-white mb-2" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>Response Time</h3>
                  <div className="flex items-center gap-2 text-xs text-[#B3B3B3] mb-1" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>
                    <Clock className="w-3 h-3 text-[#E95420]" />
                    <span>I typically respond within 24 hours</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#B3B3B3]" style={{ fontFamily: "'Ubuntu Mono', monospace" }}>
                    <Calendar className="w-3 h-3 text-[#4CAF50]" />
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