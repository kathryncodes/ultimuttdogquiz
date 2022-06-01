# Ultimutt Dog Quiz
<img src="https://github.com/kathryncodes/ultimuttdogquiz/blob/main/images/Asset%201.png" width="100">  

A cute project using the Dog API. 

> Goals:
> - Practice Async/Await
> - Practice fetch API
> - look at cute dogs :dog: 


Important Notes: My focus was on javascript for this project, so the CSS is not responsive. It's best viewed full-screen.
	
Link to quiz: https://kathryncodes.github.io/ultimuttdogquiz/

## How it's Made

Languages:

- HTML
- CSS
- Javascript

Once I had a functioning quiz, I realized my javascript file could be greatly improved. The first iteration had the app fetching the complete breed list  ***every time***  a new dog was selected. For a small project like this, it didn't hinder performance. But why fetch the same data over and over and over again? So I re-wrote the javascript file to be more streamlined and easier to comprehend. The app is now using the main.js file, but I kept the original file in there so that I can compare the difference.

## Potential Future Optimizations

- Track & Display the user's score
- Add a subtle animation while the data for each question is loading (It's still *slightly* jumpy)
- Manually format the "weird" breeds
	- Some of the breeds weren't formatted the same way as others, or need to be manually formatted. (e.g. Australian Shepherd displays as Shepherd Australian, Mexican Hairless displays as Mexicanhairless)

## Lessons Learned

Overall, I really enjoyed the process of making this quiz and the end result! This was my first time using asynchronous javascript without following a specific tutorial, and even though the first pass was very ugly-looking code, I got to practice re-formatting and optimizing the code to be more aligned with best practices. This project also introduced me to the Fisher-Yates algorithm, which was a surprise learning opportunity, but I did enjoy wading through the depths of StackOverflow threads about randomly shuffling an array. Do I completely, 100% understand the math behind the shuffle? No. But does the code work? Yes, and isn't that really what's most important at the end of the day?

