import { ReactNode } from 'react';

type CardProps = {
  title?: string;
  className?: string;
  bodyClassName?: string;
  actionsClassName?: string;
  children?: ReactNode;
  actions?: ReactNode;
  variant?: 'default' | 'side';
  cardImage?: {
    src: string;
    alt?: string;
  };
};
const Card = (props: CardProps) => {
  const {
    title,
    className,
    bodyClassName,
    actionsClassName,
    children,
    actions,
    variant = 'default',
    cardImage,
  } = props;

  const containerClassName = () => {
    let result = 'card card-bordered bg-base-100 shadow-xl';

    if (className) {
      result += ` ${className}`;
    }
    if (variant === 'side') {
      result += ` card-side`;
    }
    return result;
  };

  const getBodyClassName = () => {
    let result = 'card-body';

    if (bodyClassName) {
      result += ` ${bodyClassName}`;
    }
    return result;
  };

  const getActionsClassName = () => {
    let result = 'card-actions';

    if (actionsClassName) {
      result += ` ${actionsClassName}`;
    }
    return result;
  };

  return (
    <div className={containerClassName()}>
      {cardImage && (
        <figure>
          <img src={cardImage.src} alt={cardImage.alt} />
        </figure>
      )}
      <div className={getBodyClassName()}>
        {title && <h2 className="card-title">{title}</h2>}
        {children}
        {actions && <div className={getActionsClassName()}>{actions}</div>}
      </div>
    </div>
  );
};

export default Card;
