import './theme-button.css';
import SvgImage from '../svg-image/svg-image';
import themeSprite from '../../assets/theme-sprite.svg';
import { ReactNode, useContext } from 'react';
import { ThemeContext } from '../../App';

function ThemeButton(): ReactNode {
  const { isLightThemeSet, toggleLightTheme } = useContext(ThemeContext);

  return (
    <div
      className="theme-button"
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <label title="light theme" aria-label="light theme button">
        <input type="radio" name="theme" value="light" checked={isLightThemeSet} onChange={toggleLightTheme} />
        <SvgImage url={`${themeSprite}#sun`}></SvgImage>
      </label>
      <label title="dark theme" aria-label="dark theme button">
        <input type="radio" name="theme" value="dark" onChange={toggleLightTheme} />
        <SvgImage url={`${themeSprite}#moon`}></SvgImage>
      </label>
    </div>
  );
}

export default ThemeButton;
