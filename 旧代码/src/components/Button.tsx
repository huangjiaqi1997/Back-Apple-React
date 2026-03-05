
export interface ButtonProps {
  title: React.ReactNode
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right';
  variant?: 'primary' | 'outline';
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({ title, icon, iconPosition = 'left', variant = 'primary', disabled = false, onClick }: ButtonProps) => {
  let className = `border rounded-md px-5 py-2 transition
    cursor-pointer inline-flex items-center gap-2`
  if (variant === 'primary') {
    className += ` bg-apple-blue text-apple-white border-apple-blue hover:bg-apple-blue/90`
  } else if (variant === 'outline') {
    className += ` bg-transparent text-apple-blue hover:bg-apple-blue hover:text-apple-white hover:border-apple-blue`
  }
  if (disabled) {
    className += ` opacity-50 cursor-not-allowed hover:bg-transparent pointer-events-none`
  }
  return (
    <button
      className={className} disabled={disabled} onClick={onClick}>
      {icon && iconPosition === 'left' && icon}
      {title}
      {icon && iconPosition === 'right' && icon}
    </button>
  )
}

export default Button
