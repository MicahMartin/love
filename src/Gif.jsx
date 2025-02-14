const noGifArray = [
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTh5M3RrbTFqajBwNm9mMmJ6aWY2aHpsNDZwY2EwdTZycnUyNG5ldiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/OjGUvpfVI8SBNSEbo7/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmc5dWZsZ292eWFhdncyMHU3d29oZmk3ZGFjdWd5cWVkd3MxaTV5MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4qZrvfPVFKVEI/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmM4N3h5MjhldW4yMzVnM3V6ZnVudTNreHdkOXU3cWJ6MG13Zm5saiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7KTjGdahRfegM/giphy.gif"
];


function Gif({ response, noCount }) {
  // Default happy GIF
  let gifSrc = "https://media1.tenor.com/m/_YevIEmAd9sAAAAC/peach-cat-goma-cat.gif";

  // If "No" is clicked, show a funny GIF and re-prompt
  if (response === "false") {
    gifSrc = noGifArray[noCount - 1];
  }

  return <img src={gifSrc} alt="love u bavibana" />;
}

export default Gif
