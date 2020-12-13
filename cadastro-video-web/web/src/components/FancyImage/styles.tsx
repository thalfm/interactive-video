import styled from "styled-components";

interface PreviewProps {
    src: string,
    width?: number,
    height?: number
}
export const Preview = styled('div')<PreviewProps>`
  width: ${props => props.width !== undefined && props.width > 0 ? props.width: 500}px;
  height: ${props => props.height !== undefined && props.height > 0 ? props.height: 360}px;
  border-radius: 5px;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
`;

export const Frame = styled('div')`
    border: 5px solid #fff;
`