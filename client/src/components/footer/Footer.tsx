import logo from "./logoStore.svg"
import "./footerStyle.css"
import TelegramIcon from "@mui/icons-material/Telegram"
import MailOutlineIcon from "@mui/icons-material/MailOutline"
import TerrainOutlinedIcon from "@mui/icons-material/TerrainOutlined"
import { Link } from "react-router-dom"
import { Phone } from "@mui/icons-material"

export default function Footer() {
  const fontSize = 10

  return (
    <footer id="footer" className="footer">
      <div className="wrapper">
        <div className="footer__top">
          <div className="footer__navigation">
            <div className="footer__navigation-wrapper">
              <div className="footer__navigation-block">
                <div className="footer__navigation-title">
                  <img
                    src={logo}
                    alt="Logo"
                    style={{
                      width: "200px",
                      height: "30px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="footer__navigation-wrapper">
              <div className="footer__navigation-block">
                <div className="footer__navigation-title">
                  <div className="footer--title">Покупателям:</div>
                </div>
                <div>
                  <a
                    className="footer__navigation-item"
                    style={{ color: "black" }}
                    href="/FAQ"
                  >
                    Информация о снятии мерок
                  </a>
                </div>
                <div className="footer__navigation-item">
                  <Link
                    className="footer__navigation-item"
                    style={{ color: "black" }}
                    to="/privacy"
                  >
                    Политика конфиденциальности
                  </Link>
                </div>
              </div>
            </div>
            <div className="footer__navigation-wrapper footer__navigation-wrapper--right">
              <div className="footer__navigation-block">
                <div className="footer__navigation-title">
                  <div className="footer--title">Контакты:</div>
                </div>

                <div className="footer__navigation-item">
                  {/* Тут какие-то иконки сетей */}
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <a style={{ color: "black" }} href="https://t.me/@kkireva">
                      <TelegramIcon />
                    </a>
                    <a
                      style={{ color: "black" }}
                      href="https://elbrusboot.camp/"
                    >
                      <TerrainOutlinedIcon />
                    </a>

                    <a
                      style={{ color: "black" }}
                      href="mailto:Cape.n.coat@gmail.com"
                    >
                      <MailOutlineIcon />
                    </a>
                  </div>
                </div>

                <div className="footer__navigation-item">
                  <Phone sx={{ fontSize: "1rem", marginRight: "10px" }} />
                  +7 (920)-119-99-19
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
