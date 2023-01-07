import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
export const DerivateIcon = (props: SvgIconProps) => {

  props = {...props, htmlColor: props.htmlColor || 'inherit'}
  return (
    <SvgIcon {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="18.528" viewBox="0 0 24 18.528">
          <defs>
            <clipPath id="lwf39b9uja">
              <path data-name="Rectangle 16880" fill={props.htmlColor} d="M0 0h24v18.528H0z"/>
            </clipPath>
          </defs>
          <g data-name="Group 48535" style={{clipPath:"url(#lwf39b9uja)"}}>
            <path data-name="Path 47438" d="m24 7.4-.992-5.492a1.978 1.978 0 0 0-2.931-1.66l-2.658 2.391h-2.19L12.759.385l-.19-.137a1.978 1.978 0 0 0-2.931 1.67L8.81 6.672l-.09.083H6.531L4.06 4.5l-.189-.136a1.976 1.976 0 0 0-2.93 1.668l-.926 5.316-.015.171c0 3.751 4.113 6.66 7.651 6.66a8.355 8.355 0 0 0 4.679-1.55c.459.445.942.9 1.479 1.393l.56.506.56-.506a48.361 48.361 0 0 0 3.571-3.554 6.324 6.324 0 0 0 .711-.988C22.043 12.364 24 9.925 24 7.4m-6.99 5.753c-.685.775-1.573 1.677-2.642 2.683-1.072-1.009-1.958-1.909-2.642-2.683a2.8 2.8 0 0 1-.843-1.764.818.818 0 0 1 .247-.655.8.8 0 0 1 .641-.247 1.147 1.147 0 0 1 .508.133 1.364 1.364 0 0 1 .463.453l1.53 2.2 1.655-2.106a2.041 2.041 0 0 1 .6-.568.907.907 0 0 1 .436-.11.8.8 0 0 1 .642.247.818.818 0 0 1 .247.655 2.8 2.8 0 0 1-.843 1.764m2.791-2.213a2.736 2.736 0 0 0-.788-1.606 2.775 2.775 0 0 0-2.044-.827 2.889 2.889 0 0 0-1.353.335 3.965 3.965 0 0 0-1.244 1.1 3.244 3.244 0 0 0-1.217-1.1 3.111 3.111 0 0 0-1.381-.335A2.825 2.825 0 0 0 8.9 11.393a4.653 4.653 0 0 0 1.34 3.075c.2.232.428.475.663.724a6.244 6.244 0 0 1-3.253 1c-2.541 0-5.6-2.044-5.668-4.6l.926-5.308.009-.084v-.06l2.848 2.6h3.723l1.16-1.057.958-5.5.009-.093v-.061l2.847 2.6h3.726l2.837-2.599v.053l.993 5.406a4.575 4.575 0 0 1-2.218 3.453" fill={props.htmlColor || '#fff'}/>
          </g>
      </svg>
    </SvgIcon>
  );
}

export default DerivateIcon;