import React from 'react';
import { 
  FacebookShareButton, FacebookIcon,
  TwitterShareButton, TwitterIcon,
  TelegramShareButton, TelegramIcon
} from "react-share";
import LinkIcon from '@material-ui/icons/Link';

import { getUrlTo } from '../../helpers/functions';
import { VerticalList } from '../../components/List';
import { POST_ROUTE } from '../../constants/routes';
import SocialItem from './SocialItem';

import './SocialList.scss';

export default function ShareList({ id, username, description }) {
  const location = window.location.href;
  const postUrl = getUrlTo(location, POST_ROUTE, id);

  const renderFacebookBtn = ({ children }) => {
    return (
      <FacebookShareButton
        url={postUrl}
        title={username}
        quote={description}
        resetButtonStyle={false}
        className="social-btn">
          {children}
      </FacebookShareButton>
    );
  }

  const renderTwitterBtn = ({ children }) => {
    return (
      <TwitterShareButton
        url={postUrl}
        title={username}
        via={description}
        resetButtonStyle={false}
        className="social-btn">
        {children}
      </TwitterShareButton>
    );
  }

  const renderTelegramBtn = ({ children }) => {
    return (
      <TelegramShareButton
        url={postUrl}
        title={username}
        resetButtonStyle={false}
        className="social-btn">
          {children}
      </TelegramShareButton>
    );
  }

  const renderCopyBtn = ({ children }) => {
    return (
      <div className="react-share__ShareButton social-btn" onClick={() => navigator.clipboard.writeText(postUrl)}>
        {children}
      </div>
    );
  }

  return (
    <VerticalList>
      <SocialItem 
        renderIcon={() => (
          <FacebookIcon size={32} round />
        )}
        text="Share to Facebook"
        renderButton={(props) => renderFacebookBtn(props)} />
      <SocialItem 
        renderIcon={() => (
          <TwitterIcon size={32} round />
        )}
        text="Share to Twitter"
        renderButton={(props) => renderTwitterBtn(props)} />
      <SocialItem 
        renderIcon={() => (
          <TelegramIcon size={32} round />
        )}
        text="Share to Telegram"
        renderButton={(props) => renderTelegramBtn(props)} />
      <SocialItem 
        renderIcon={() => (
          <LinkIcon style={{ fontSize: "32px", color: "#37aee2" }} />
        )}
        text="Copy"
        renderButton={(props) => renderCopyBtn(props)} />
    </VerticalList>
  )
};
