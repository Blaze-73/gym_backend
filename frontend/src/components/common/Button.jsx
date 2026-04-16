import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...props 
}) => {
  const variants = {
    primary: 'bg-primary-fixed text-on-primary-fixed hover:scale-105',
    secondary: 'bg-surface-container-highest text-on-surface hover:bg-white/10',
    danger: 'bg-error text-white hover:bg-error/80',
    outline: 'border border-primary-fixed text-primary-fixed hover:bg-primary-fixed/10',
    ghost: 'text-on-surface-variant hover:text-white hover:bg-white/5',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const baseClasses = `
    font-headline font-bold tracking-widest uppercase rounded 
    transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
    flex items-center justify-center gap-2
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `;

  return (
    <motion.button
      type={type}
      className={baseClasses}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      {...props}
    >
      {loading && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </motion.button>
  );
};

export default Button;
