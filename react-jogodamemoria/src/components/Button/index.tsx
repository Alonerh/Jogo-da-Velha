import * as C from './styles';

type Props = {
    label: string,
    icon?: any, // Qualquer tipo | Não recomendável, por ficar exposto a erros;
    onClick: React.MouseEventHandler<HTMLDivElement> // Evento de clique de uma div no React;
}

export const Button = ({ label, icon, onClick }:Props) => {
    return (
        <C.Container onClick={onClick}>
            {icon && 
                <C.IconArea>
                    <C.Icon src={icon}/>
                </C.IconArea>
            }   
            <C.Label>{label}</C.Label>
        </C.Container>
    );
}