import AccountCircle from '@mui/icons-material/AccountCircle';
import AlternateEmail from '@mui/icons-material/AlternateEmail';
import Favorite from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import FileUpload from '@mui/icons-material/FileUpload';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FolderIcon from '@mui/icons-material/Folder';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import MessageIcon from '@mui/icons-material/Message';
import ShareIcon from "@mui/icons-material/Share";
import MenuIcon from '@mui/icons-material/Menu';
import WarningIcon from "@mui/icons-material/Warning";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const useIcon = (icon, color, size) => {
    switch (icon) {
        case 'account-circle':
            return <AccountCircle color={color} size={size} />
        case 'home':
            return <HomeIcon color={color} size={size} />
        case 'search':
            return <SearchIcon color={color} size={size} />
        case 'addHome':
            return <HomeIcon color={color} size={size} />
        case 'email':
            return <AlternateEmail color={color} size={size} />
        case 'visibility':
            return <Visibility color={color} size={size} />
        case 'visibilityOff':
            return <VisibilityOff color={color} size={size} />
        case 'favorite':
            return <Favorite color={color} size={size} />
        case 'favoriteBorder':
            return <FavoriteBorderIcon color={color} size={size} />
        case 'folder':
            return <FolderIcon color={color} size={size} />
        case 'upload':
            return <FileUpload color={color} size={size} />
        case 'filter':
            return <FilterAltIcon color={color} size={size} />
        case 'message':
            return <MessageIcon color={color} size={size} />
        case 'send':
            return <ChatIcon color={color} size={size} />
        case 'share':
            return <ShareIcon color={color} size={size} />
        case 'menu':
            return <MenuIcon color={color} size={size} />
        case 'back-arrow':
            return <ArrowBackIcon color={color} size={size} />
        case 'warning':
            return <WarningIcon color={color} size={size} />
        default:
    }
}

export default useIcon;