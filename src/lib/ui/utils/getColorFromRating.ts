const getColorFromRating = (rating: number) => {
  if (rating <= 50) return '#808000' // olive
  if (rating <= 80) return '#cccccc' // silver
  if (rating <= 90) return '#ffd900' // gold
  if (rating <= 100) return '#03fff7' //Diamond #b9f2ff
}

export default getColorFromRating
