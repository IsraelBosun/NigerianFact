import { AntDesign, Feather } from "@expo/vector-icons";

export const icons = {
    index: (props)=> <AntDesign name="home" size={26} {...props} />,
    explore: (props)=> <Feather name="search" size={26} {...props} />,
    favourites: (props)=> <AntDesign name="heart" size={26} color='red' />,
    settings: (props)=> <Feather name="settings" size={26} {...props} />,
}