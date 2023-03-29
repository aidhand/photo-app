import Image from "next/image";


export default function Picture(props: { src: string; alt: string; sizes?: string[]; }) {
  let sizes = ["0900", "0600", "0300"];

  if (props.sizes) {
    sizes = props.sizes;
  }

  return (
    <picture>
      {sizes.map((size) => {
        return (
          <source
            key={size}
            srcSet={`${props.src}/${size}`}
            media={`(min-width: ${size}px)`}
          />
        );
      })}
      <Image src={`${props.src}/public}`} alt={props.alt} width="900" height="600"/>
    </picture>
  );
}
