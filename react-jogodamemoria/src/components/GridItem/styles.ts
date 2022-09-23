import styled from "styled-components";

type ContainerProps = {
    showBackground: boolean;
    opacity?: number;
}

export const Container = styled.div<ContainerProps>` // Atráves da Props, é possível adicionar Props;
    background-color: ${props => props.showBackground ? '#1550FF' : '#E2E3E3'}; // Troca as cores usando props;
    height: 100px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

type IconProps = {
    opacity?: number; // Opcional pois não tem em todos
}

export const Icon = styled.img<IconProps>`
    opacity: ${props => props.opacity ??  1}; // (??) Põe ele mesmo;
    // Quando o item tem opacity, use ele, caso não, bote 1 | Tipo assim: props.opacity ? props.opacity : 1
    width: 40px;
    height: 40px;
    &:hover {
        opacity: .5;
    }
`;