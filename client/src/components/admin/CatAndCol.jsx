import Category from "./Category"
import Collection from "./Collection"
import styles from "./CatAndCol.module.css"

export default function CatAndCol() {
  return (
    <div className={styles.catColWrapper}>
      <Category />
      <Collection />
    </div>
  )
}
