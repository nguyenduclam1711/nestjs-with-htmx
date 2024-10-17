type AvatarProps = {
  placeholder?: string;
  imgSrc?: string;
};
const Avatar = (props: AvatarProps) => {
  const { placeholder, imgSrc } = props;

  const getContainerClassName = () => {
    let result = 'avatar';
    if (placeholder) {
      result += ` placeholder`;
    }
    return result;
  };

  return (
    <div className={getContainerClassName()}>
      {imgSrc && (
        <div className="w-10 rounded-full">
          {imgSrc && <img src={imgSrc} />}
        </div>
      )}
      {placeholder && !imgSrc && (
        <div className="bg-neutral text-neutral-content w-10 rounded-full">
          <span className="text-xl">{placeholder}</span>
        </div>
      )}
    </div>
  );
};

export default Avatar;
