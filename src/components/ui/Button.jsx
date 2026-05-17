import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const variants = {
  primary: 'bg-gradient-gold text-noir font-semibold hover:shadow-lg hover:shadow-gold/20',
  outline: 'border border-gold/40 text-gold hover:bg-gold/10 hover:border-gold',
  ghost: 'text-gold hover:text-gold-light',
  white: 'border border-ivory/20 text-ivory hover:bg-ivory/5 hover:border-ivory/40',
};

const sizes = {
  sm: 'px-5 py-2 text-xs',
  md: 'px-7 py-3 text-sm',
  lg: 'px-10 py-4 text-base',
};

const Button = ({
  children, variant = 'primary', size = 'md', to, href, onClick,
  icon = false, className = '', ...props
}) => {
  const baseClasses = `inline-flex items-center justify-center gap-2 font-inter tracking-wide transition-all duration-400 ease-luxury rounded-sm ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {children}
      {icon && (
        <motion.span
          className="inline-block"
          whileHover={{ x: 4 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowRight size={size === 'sm' ? 14 : 16} />
        </motion.span>
      )}
    </>
  );

  if (to) {
    return <Link to={to} className={baseClasses} {...props}>{content}</Link>;
  }
  if (href) {
    return <a href={href} className={baseClasses} target="_blank" rel="noopener noreferrer" {...props}>{content}</a>;
  }
  return <button onClick={onClick} className={baseClasses} {...props}>{content}</button>;
};

export default Button;
