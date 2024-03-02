import { Colors } from '../constants/Colors'

const getColorFromRating = (rating: number) => {
  if (rating <= 50) return Colors.OLIVE
  if (rating <= 80) return Colors.SILVER
  if (rating <= 90) return Colors.GOLD
  if (rating <= 100) return Colors.DIAMOND
}

export default getColorFromRating
