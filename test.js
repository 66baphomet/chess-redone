document.addEventListener("DOMContentLoaded", () => {
    let app = document.querySelector(".app");
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let squares = document.createElement("div");

            var mq = window.matchMedia( "(max-width: 800px)" );
            if(mq.matches)
            {
                squares.style.height = "50px";
                squares.style.width = "40px";
            }
            else
            {
                squares.style.height = "80px";
                squares.style.width = "80px";
            }


            if (i == 0) {

                //adding the black power pieces
                if (j == 0 || j == 7) {
                    squares.classList.add("blackRook");
                    squares.classList.add("black");
                }

                if (j == 1 || j == 6) {
                    squares.classList.add("blackKnight");
                    squares.classList.add("black");
                }

                if (j == 2 || j == 5) {
                    
                    squares.classList.add("blackBishop");
                    squares.classList.add("black");
                }

                if (j == 3) {
                    squares.classList.add("blackQueen");
                    squares.classList.add("black");
                }

                if (j == 4) {
                    squares.classList.add("blackKing");
                    squares.classList.add("black");
                }
            }

            //adding the white power pieces
            if (i == 7) {
                if (j == 0 || j == 7) {
                    squares.classList.add("whiteRook");
                    squares.classList.add("white");
                }

                if (j == 1 || j == 6) {
                    squares.classList.add("whiteKnight");
                    squares.classList.add("white");
                }

                if (j == 2 || j == 5) {
                  
                    squares.classList.add("whiteBishop");
                    squares.classList.add("white");
                }

                if (j == 3) {
                    squares.classList.add("whiteQueen");
                    squares.classList.add("white");
                }

                if (j == 4) {
                    squares.classList.add("whiteKing");
                    squares.classList.add("white");
                }
            }


            if (i % 2 == 0) {
                if (j % 2 != 0) {
                    squares.style.backgroundColor = "black";
                }
                else
                {
                    squares.style.backgroundColor = "white";
                }

                if (i == 6) {
                    squares.classList.add("whitePawn");
                    squares.classList.add("white");
                }
            }
            else {
                if (j % 2 == 0) {
                    squares.style.backgroundColor = "black";
                }
                else
                {
                    squares.style.backgroundColor = "white";
                }


                if (i == 1) {
                    squares.classList.add("blackPawn");
                    squares.classList.add("black");
                }
            }

            app.appendChild(squares);
        }
    }



    allSquares = document.querySelectorAll(".app div");
    for (let i = 0; i < 64; i++)
    {
        allSquares[i].addEventListener("click", makeMove);
    }

    let squareChosenArray = [];
    let squareChosenIdArray = [];
    let turnForWhite = true;
    //boolean variables to detect the piece contained in secondSquare
    let whitePawn = false, whiteRook = false, whiteBishop = false, whiteKnight = false, whiteQueen = false, whiteKing = false; 
    let blackPawn = false, blackRook = false, blackBishop = false, blackKnight = false, blackQueen = false, blackKing = false; 

    //boolean to detect if restriction needed
    let restrictionNeeded = false;


    function makeMove() {

        let squares = document.querySelectorAll(".app div");
        let index = Array.from(squares).indexOf(this);

        squares[index].classList.add("selected");

        squareChosenArray.push(squares[index]);
        squareChosenIdArray.push(index);

        if(squareChosenArray.length == 1 && squareChosenArray[0].classList.contains("white") && 
            turnForWhite
            )
            {
            let firstSquare = squareChosenArray[0];
            let firstSquareId = squareChosenIdArray[0];
            checkPossibleMove(firstSquare,firstSquareId);
            turnForWhite = false;
        }
        else if(
            squareChosenArray.length == 1 && squareChosenArray[0].classList.contains("black") && 
            !turnForWhite
        )
        {
            let firstSquare = squareChosenArray[0];
            let firstSquareId = squareChosenIdArray[0];
            checkPossibleMove(firstSquare,firstSquareId);
            turnForWhite = true;
        }
        else if(squareChosenArray.length != 2)
        {
            squareChosenArray[0].classList.remove("selected");
            squareChosenIdArray = [];
            squareChosenArray = [];
        }


        if (squareChosenArray.length == 2) {
            let firstSquare = squareChosenArray[0];
            let secondSquare = squareChosenArray[1];
            let firstSquareId = squareChosenIdArray[0];
            let secondSquareId = squareChosenIdArray[1];

           checkPieceContainedInSeceondSquare(secondSquare);

       
            checkMove(firstSquare, secondSquare, firstSquareId, secondSquareId);
            removePossibleMove();
            removeAllKingCheck();
            giveKingCheck();
            checkKingCheck(firstSquare, secondSquare);

            restricionForSecondSquare(secondSquare);
                       
           giveKingCheck();
           checkKingCheckAfterRestriction();


            firstSquare.classList.remove("selected");
            secondSquare.classList.remove("selected");

            squareChosenArray = [];
            squareChosenIdArray = [];
        }
    }



    //from here starts checking possible moves

    function checkPossibleMove(firstSquare,firstSquareId){
        //white pieces
        if (firstSquare.classList.contains("white")) {
            whitePossibleMoveCheck(firstSquare,firstSquareId);
        }
        //black pieces
        if (firstSquare.classList.contains("black")) {

            blackPossibleMoveCheck(firstSquare, firstSquareId);
        }
    }

    function whitePossibleMoveCheck(firstSquare, firstSquareId){
        if (firstSquare.classList.contains("whitePawn")) {
            whitePawnPossibleMoveCheck(firstSquare, firstSquareId);
        }
        // white rook movement
        else if (firstSquare.classList.contains("whiteRook")) {
            whiteRookPossibleMoveCheck(firstSquare, firstSquareId);
        }
        else if (firstSquare.classList.contains("whiteBishop")) {
            whiteBishopPossibleMoveCheck(firstSquare, firstSquareId);
        }
        else if (firstSquare.classList.contains("whiteKnight")) {
            whiteKnightPossibleMoveCheck(firstSquare, firstSquareId);
        }
        else if (firstSquare.classList.contains("whiteQueen")) {
            whiteQueenPossibleMoveCheck(firstSquare, firstSquareId);
        }
        else if (firstSquare.classList.contains("whiteKing")) {
            whiteKingPossibleMoveCheck(firstSquare, firstSquareId);
        }
    }

    function blackPossibleMoveCheck(firstSquare, firstSquareId){
        if (firstSquare.classList.contains("blackPawn")) {
            blackPawnPossibleMoveCheck(firstSquare, firstSquareId);
        }
        //white rook movement
        else if (firstSquare.classList.contains("blackRook")) {
            blackRookPossibleMoveCheck(firstSquare, firstSquareId);
        }
        else if (firstSquare.classList.contains("blackBishop")) {
            blackBishopPossibleMoveCheck(firstSquare, firstSquareId);
        }
        else if (firstSquare.classList.contains("blackKnight")) {
            blackKnightPossibleMoveCheck(firstSquare, firstSquareId);
        }
        else if (firstSquare.classList.contains("blackQueen")) {
            blackQueenPossibleMoveCheck(firstSquare, firstSquareId);
        }
        else if (firstSquare.classList.contains("blackKing")) {
            blackKingPossibleMoveCheck(firstSquare, firstSquareId);
        }
    }

    //white pieces

    function whitePawnPossibleMoveCheck(firstSquare, firstSquareId){
        if( !allSquares[firstSquareId-8].classList.contains("white") && !allSquares[firstSquareId-8].classList.contains("black"))
        {
            allSquares[firstSquareId-8].classList.add("possible");
        }

        if( allSquares[firstSquareId-7].classList.contains("black") && 
            (
              ( (firstSquareId >= 48 && firstSquareId <= 55) && (firstSquareId-7 >= 40 && firstSquareId-7 <= 47) ) ||
              ( (firstSquareId >= 40 && firstSquareId <= 47) && (firstSquareId-7 >= 32 && firstSquareId-7 <= 39) ) ||
              ( (firstSquareId >= 32 && firstSquareId <= 39) && (firstSquareId-7 >= 24 && firstSquareId-7 <= 31) ) ||
              ( (firstSquareId >= 24 && firstSquareId <= 31) && (firstSquareId-7 >= 16 && firstSquareId-7 <= 23) ) ||
              ( (firstSquareId >= 16 && firstSquareId <= 23) && (firstSquareId-7 >= 8 && firstSquareId-7 <= 15) ) ||
              ( (firstSquareId >= 8 && firstSquareId <= 15) && (firstSquareId-7 >= 0 && firstSquareId-7 <= 7) ) 
            )
        )
        {
            allSquares[firstSquareId-7].classList.add("possible");
        }

        if( allSquares[firstSquareId-9].classList.contains("black") &&
        (
            ( (firstSquareId >= 48 && firstSquareId <= 55) && (firstSquareId-9 >= 40 && firstSquareId-9 <= 47) ) ||
            ( (firstSquareId >= 40 && firstSquareId <= 47) && (firstSquareId-9 >= 32 && firstSquareId-9 <= 39) ) ||
            ( (firstSquareId >= 32 && firstSquareId <= 39) && (firstSquareId-9 >= 24 && firstSquareId-9 <= 31) ) ||
            ( (firstSquareId >= 24 && firstSquareId <= 31) && (firstSquareId-9 >= 16 && firstSquareId-9 <= 23) ) ||
            ( (firstSquareId >= 16 && firstSquareId <= 23) && (firstSquareId-9 >= 8 && firstSquareId-9 <= 15) ) ||
            ( (firstSquareId >= 8 && firstSquareId <= 15) && (firstSquareId-9 >= 0 && firstSquareId-9 <= 7) ) 
          )
        )
        {
            allSquares[firstSquareId-9].classList.add("possible");
        }
        
        if(
            firstSquareId <= 55 && firstSquareId >= 48 &&
            ( !allSquares[firstSquareId-8].classList.contains("white") && !allSquares[firstSquareId-8].classList.contains("black")) &&
            ( !allSquares[firstSquareId-16].classList.contains("white") && !allSquares[firstSquareId-16].classList.contains("black"))
        )
        {
            allSquares[firstSquareId-16].classList.add("possible");
        }
 
    }

    function  whiteRookPossibleMoveCheck(firstSquare, firstSquareId){

       for(let i = 1; i<=7; i++)
       {
            if( firstSquareId-i*8>=0 &&
                ( allSquares[firstSquareId-i*8].classList.contains("white") || allSquares[firstSquareId-i*8].classList.contains("black") )
            )
            {
                if(allSquares[firstSquareId-i*8].classList.contains("black"))
                    allSquares[firstSquareId-i*8].classList.add("possible");
                break;
            }
            else if(firstSquareId-i*8>=0)
            {   
                allSquares[firstSquareId-i*8].classList.add("possible");
            }
       }

       for(let i = 1; i<=7; i++)
       {
            if( firstSquareId+i*8<=63 &&
                ( allSquares[firstSquareId+i*8].classList.contains("white") || allSquares[firstSquareId+i*8].classList.contains("black") )
            )
            {
                if(allSquares[firstSquareId+i*8].classList.contains("black"))
                    allSquares[firstSquareId+i*8].classList.add("possible");
                break;
            }
            else if(firstSquareId+i*8<=63 )
            {
                allSquares[firstSquareId+i*8].classList.add("possible");
            }
       }

       for(let i = 1; i<=7; i++)
       {
            if( 
               ( (firstSquareId>=0 && firstSquareId<=7) && (firstSquareId+i<=7) &&
                ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) )  ||

                ( (firstSquareId>=8 && firstSquareId<=15) && (firstSquareId+i<=15) &&
                ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) ) ||

                ( (firstSquareId>=16 && firstSquareId<=23) && (firstSquareId+i<=23) &&
                ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) ) ||

                ( (firstSquareId>=24 && firstSquareId<=31) && (firstSquareId+i<=31) &&
                ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) ) ||

                ( (firstSquareId>=32 && firstSquareId<=39) && (firstSquareId+i<=39) &&
                ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) ) ||

                ( (firstSquareId>=40 && firstSquareId<=47) && (firstSquareId+i<=47) &&
                ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) ) ||

                ( (firstSquareId>=48 && firstSquareId<=55) && (firstSquareId+i<=55) &&
                ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) ) ||

                ( (firstSquareId>=56 && firstSquareId<=63) && (firstSquareId+i<=63) &&
                ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) ) 
            )
            {
                if(allSquares[firstSquareId+i].classList.contains("black"))
                    allSquares[firstSquareId+i].classList.add("possible");
                break;
            }
            else if( 
               ( (firstSquareId>=0 && firstSquareId<=7) && (firstSquareId+i<=7) ) || 
               ( (firstSquareId>=8 && firstSquareId<=15) && (firstSquareId+i<=15) ) ||
               ( (firstSquareId>=16 && firstSquareId<=23) && (firstSquareId+i<=23) ) ||
               ( (firstSquareId>=24 && firstSquareId<=31) && (firstSquareId+i<=31) ) ||
               ( (firstSquareId>=32 && firstSquareId<=39) && (firstSquareId+i<=39) ) ||
               ( (firstSquareId>=40 && firstSquareId<=47) && (firstSquareId+i<=47) ) ||
               ( (firstSquareId>=48 && firstSquareId<=55) && (firstSquareId+i<=55) ) ||
               ( (firstSquareId>=56 && firstSquareId<=63) && (firstSquareId+i<=63) ) 
                )
            {
                allSquares[firstSquareId+i].classList.add("possible");
            }
       }

       for(let i = 1; i<=7; i++)
       {
            if( 
               ( (firstSquareId>=0 && firstSquareId<=7) && (firstSquareId-i>=0) &&
                ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) )  ||

                ( (firstSquareId>=8 && firstSquareId<=15) && (firstSquareId-i>=8) &&
                ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) ) ||

                ( (firstSquareId>=16 && firstSquareId<=23) && (firstSquareId-i>=16) &&
                ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) ) ||

                ( (firstSquareId>=24 && firstSquareId<=31) && (firstSquareId-i>=24) &&
                ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) ) ||

                ( (firstSquareId>=32 && firstSquareId<=39) && (firstSquareId-i>=32) &&
                ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) ) ||

                ( (firstSquareId>=40 && firstSquareId<=47) && (firstSquareId-i>=40) &&
                ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) ) ||

                ( (firstSquareId>=48 && firstSquareId<=55) && (firstSquareId-i>=48) &&
                ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) ) ||

                ( (firstSquareId>=56 && firstSquareId<=63) && (firstSquareId-i>=56) &&
                ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) ) 
            )
            {
                if(allSquares[firstSquareId-i].classList.contains("black"))
                    allSquares[firstSquareId-i].classList.add("possible");
                break;
            }
            else if( 
               ( (firstSquareId>=0 && firstSquareId<=7) &&(firstSquareId-i>=0) ) || 
               ( (firstSquareId>=8 && firstSquareId<=15) && (firstSquareId-i>=8) ) ||
               ( (firstSquareId>=16 && firstSquareId<=23) && (firstSquareId-i>=16) ) ||
               ( (firstSquareId>=24 && firstSquareId<=31) && (firstSquareId-i>=24) ) ||
               ( (firstSquareId>=32 && firstSquareId<=39) && (firstSquareId-i>=32) ) ||
               ( (firstSquareId>=40 && firstSquareId<=47) && (firstSquareId-i>=40) ) ||
               ( (firstSquareId>=48 && firstSquareId<=55) && (firstSquareId-i>=48) ) ||
               ( (firstSquareId>=56 && firstSquareId<=63) && (firstSquareId-i>=56) ) 
                )
            {
                allSquares[firstSquareId-i].classList.add("possible");
            }
       }

 


    }

    function whiteBishopPossibleMoveCheck(firstSquare, firstSquareId){

        for(let i = 1; i<=7; i++)
        {
             if( firstSquareId-i*7>=0 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId-i*7].style.backgroundColor) &&
                 ( allSquares[firstSquareId-i*7].classList.contains("white") || allSquares[firstSquareId-i*7].classList.contains("black") )
             )
             {
                 if(allSquares[firstSquareId-i*7].classList.contains("black"))
                     allSquares[firstSquareId-i*7].classList.add("possible");
                 break;
             }
             else if(
                 firstSquareId-i*7>=0
                 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId-i*7].style.backgroundColor)
                 )
             {   
                 allSquares[firstSquareId-i*7].classList.add("possible");
             }
        }

        for(let i = 1; i<=7; i++)
        {
             if( firstSquareId+i*7<=63 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId+i*7].style.backgroundColor) &&
                 ( allSquares[firstSquareId+i*7].classList.contains("white") || allSquares[firstSquareId+i*7].classList.contains("black") )
             )
             {
                 if(allSquares[firstSquareId+i*7].classList.contains("black"))
                     allSquares[firstSquareId+i*7].classList.add("possible");
                 break;
             }
             else if(
                 firstSquareId+i*7<=63
                 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId+i*7].style.backgroundColor)
                 )
             {   
                 allSquares[firstSquareId+i*7].classList.add("possible");
             }
        }

        for(let i = 1; i<=7; i++)
        {
             if( firstSquareId+i*9<=63 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId+i*9].style.backgroundColor) &&
                 ( allSquares[firstSquareId+i*9].classList.contains("white") || allSquares[firstSquareId+i*9].classList.contains("black") )
             )
             {
                 if(allSquares[firstSquareId+i*9].classList.contains("black"))
                     allSquares[firstSquareId+i*9].classList.add("possible");
                 break;
             }
             else if(
                 firstSquareId+i*9<=63
                 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId+i*9].style.backgroundColor)
                 )
             {   
                 allSquares[firstSquareId+i*9].classList.add("possible");
             }
        }

        for(let i = 1; i<=7; i++)
        {
             if( firstSquareId-i*9>=0 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId-i*9].style.backgroundColor) &&
                 ( allSquares[firstSquareId-i*9].classList.contains("white") || allSquares[firstSquareId-i*9].classList.contains("black") )
             )
             {
                 if(allSquares[firstSquareId-i*9].classList.contains("black"))
                     allSquares[firstSquareId-i*9].classList.add("possible");
                 break;
             }
             else if(
                 firstSquareId-i*9>=0
                 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId-i*9].style.backgroundColor)
                 )
             {   
                 allSquares[firstSquareId-i*9].classList.add("possible");
             }
        }

     }

     function whiteKnightPossibleMoveCheck(firstSquare, firstSquareId){

            if(
                ( firstSquareId-15>=0 && firstSquareId-15<=63 ) &&
                (
                    (firstSquareId >= 0 && firstSquareId <7) || (firstSquareId >= 8 && firstSquareId <15) || (firstSquareId >= 16 && firstSquareId <23) ||
                    (firstSquareId >= 24 && firstSquareId <31) || (firstSquareId >= 32 && firstSquareId <39) ||(firstSquareId >= 40 && firstSquareId <47) || 
                    (firstSquareId >= 48 && firstSquareId <55) || (firstSquareId >= 56 && firstSquareId <63)
                ) &&
                !allSquares[firstSquareId-15].classList.contains("white") 
            )
            {
                allSquares[firstSquareId-15].classList.add("possible");
            }
    
            if(
                ( firstSquareId+15>=0 && firstSquareId+15<=63 ) &&
                (
                    (firstSquareId > 0 && firstSquareId <=7) || (firstSquareId > 8 && firstSquareId <=15) || (firstSquareId > 16 && firstSquareId <=23) ||
                    (firstSquareId > 24 && firstSquareId <=31) || (firstSquareId > 32 && firstSquareId <=39) ||(firstSquareId > 40 && firstSquareId <=47) || 
                    (firstSquareId > 48 && firstSquareId <=55) || (firstSquareId > 56 && firstSquareId <=63)
                ) &&
                !allSquares[firstSquareId+15].classList.contains("white")
            )
            {
                allSquares[firstSquareId+15].classList.add("possible");
            }
    
            if(
                ( firstSquareId-17>=0 && firstSquareId-17<=63 ) &&
                (
                    (firstSquareId > 0 && firstSquareId <=7) || (firstSquareId > 8 && firstSquareId <=15) || (firstSquareId > 16 && firstSquareId <=23) ||
                    (firstSquareId > 24 && firstSquareId <=31) || (firstSquareId > 32 && firstSquareId <=39) ||(firstSquareId > 40 && firstSquareId <=47) || 
                    (firstSquareId > 48 && firstSquareId <=55) || (firstSquareId > 56 && firstSquareId <=63)
                ) &&
                !allSquares[firstSquareId-17].classList.contains("white")
                )
            {
                allSquares[firstSquareId-17].classList.add("possible");
            }
    
            if(
                ( firstSquareId+17>=0 && firstSquareId+17<=63 ) &&
                (
                    (firstSquareId >= 0 && firstSquareId <7) || (firstSquareId >= 8 && firstSquareId <15) || (firstSquareId >= 16 && firstSquareId <23) ||
                    (firstSquareId >= 24 && firstSquareId <31) || (firstSquareId >= 32 && firstSquareId <39) ||(firstSquareId >= 40 && firstSquareId <47) || 
                    (firstSquareId >= 48 && firstSquareId <55) || (firstSquareId >= 56 && firstSquareId <63)
                ) &&
                !allSquares[firstSquareId+17].classList.contains("white")
            )
            {
                allSquares[firstSquareId+17].classList.add("possible");
            }
    
            if(
                ( firstSquareId+6>=0 && firstSquareId+6<=63 ) && 
                (
                    (firstSquareId > 1 && firstSquareId <=7) || (firstSquareId > 9 && firstSquareId <=15) || (firstSquareId > 17 && firstSquareId <=23) ||
                    (firstSquareId > 25 && firstSquareId <=31) || (firstSquareId > 33 && firstSquareId <=39) ||(firstSquareId > 41 && firstSquareId <=47) || 
                    (firstSquareId > 49 && firstSquareId <=55) || (firstSquareId > 57 && firstSquareId <=63)
                ) &&
                !allSquares[firstSquareId+6].classList.contains("white")
            )
            {
                allSquares[firstSquareId+6].classList.add("possible");
            }
    
            if(
                ( firstSquareId-6>=0 && firstSquareId-6<=63 ) && 
                (
                    (firstSquareId >= 0 && firstSquareId <6) || (firstSquareId >= 8 && firstSquareId <14) || (firstSquareId >= 16 && firstSquareId <22) ||
                    (firstSquareId >= 24 && firstSquareId <30) || (firstSquareId >= 32 && firstSquareId <38) ||(firstSquareId >= 40 && firstSquareId <46) || 
                    (firstSquareId >= 48 && firstSquareId <54) || (firstSquareId >= 56 && firstSquareId <62)
                ) &&
                !allSquares[firstSquareId-6].classList.contains("white")
            )
            {
                allSquares[firstSquareId-6].classList.add("possible");
            }
    
            if(
                ( firstSquareId-10>=0 && firstSquareId-10<=63 ) &&
                (
                    (firstSquareId > 1 && firstSquareId <=7) || (firstSquareId > 9 && firstSquareId <=15) || (firstSquareId > 17 && firstSquareId <=23) ||
                    (firstSquareId > 25 && firstSquareId <=31) || (firstSquareId > 33 && firstSquareId <=39) ||(firstSquareId > 41 && firstSquareId <=47) || 
                    (firstSquareId > 49 && firstSquareId <=55) || (firstSquareId > 57 && firstSquareId <=63)
                ) &&
                !allSquares[firstSquareId-10].classList.contains("white")
            )
            {
                allSquares[firstSquareId-10].classList.add("possible");
            }
    
            if(
                ( firstSquareId+10>=0 && firstSquareId+10<=63 ) &&
                (
                    (firstSquareId >= 0 && firstSquareId <6) || (firstSquareId >= 8 && firstSquareId <14) || (firstSquareId >= 16 && firstSquareId <22) ||
                    (firstSquareId >= 24 && firstSquareId <30) || (firstSquareId >= 32 && firstSquareId <38) ||(firstSquareId >= 40 && firstSquareId <46) || 
                    (firstSquareId >= 48 && firstSquareId <54) || (firstSquareId >= 56 && firstSquareId <62)
                ) &&
                !allSquares[firstSquareId+10].classList.contains("white")
            )
            {
                allSquares[firstSquareId+10].classList.add("possible");
            }

        
     }

     function whiteQueenPossibleMoveCheck(firstSquare, firstSquareId){

        //rook part
        for(let i = 1; i<=7; i++)
        {
             if( firstSquareId-i*8>=0 &&
                 ( allSquares[firstSquareId-i*8].classList.contains("white") || allSquares[firstSquareId-i*8].classList.contains("black") )
             )
             {
                 if(allSquares[firstSquareId-i*8].classList.contains("black"))
                     allSquares[firstSquareId-i*8].classList.add("possible");
                 break;
             }
             else if(firstSquareId-i*8>=0)
             {   
                 allSquares[firstSquareId-i*8].classList.add("possible");
             }
        }
 
        for(let i = 1; i<=7; i++)
        {
             if( firstSquareId+i*8<=63 &&
                 ( allSquares[firstSquareId+i*8].classList.contains("white") || allSquares[firstSquareId+i*8].classList.contains("black") )
             )
             {
                 if(allSquares[firstSquareId+i*8].classList.contains("black"))
                     allSquares[firstSquareId+i*8].classList.add("possible");
                 break;
             }
             else if(firstSquareId+i*8<=63 )
             {
                 allSquares[firstSquareId+i*8].classList.add("possible");
             }
        }
 
        for(let i = 1; i<=7; i++)
        {
             if( 
                ( (firstSquareId>=0 && firstSquareId<=7) && (firstSquareId+i<=7) &&
                 ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) )  ||
 
                 ( (firstSquareId>=8 && firstSquareId<=15) && (firstSquareId+i<=15) &&
                 ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=16 && firstSquareId<=23) && (firstSquareId+i<=23) &&
                 ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=24 && firstSquareId<=31) && (firstSquareId+i<=31) &&
                 ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=32 && firstSquareId<=39) && (firstSquareId+i<=39) &&
                 ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=40 && firstSquareId<=47) && (firstSquareId+i<=47) &&
                 ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=48 && firstSquareId<=55) && (firstSquareId+i<=55) &&
                 ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=56 && firstSquareId<=63) && (firstSquareId+i<=63) &&
                 ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) ) 
             )
             {
                 if(allSquares[firstSquareId+i].classList.contains("black"))
                     allSquares[firstSquareId+i].classList.add("possible");
                 break;
             }
             else if( 
                ( (firstSquareId>=0 && firstSquareId<=7) && (firstSquareId+i<=7) ) || 
                ( (firstSquareId>=8 && firstSquareId<=15) && (firstSquareId+i<=15) ) ||
                ( (firstSquareId>=16 && firstSquareId<=23) && (firstSquareId+i<=23) ) ||
                ( (firstSquareId>=24 && firstSquareId<=31) && (firstSquareId+i<=31) ) ||
                ( (firstSquareId>=32 && firstSquareId<=39) && (firstSquareId+i<=39) ) ||
                ( (firstSquareId>=40 && firstSquareId<=47) && (firstSquareId+i<=47) ) ||
                ( (firstSquareId>=48 && firstSquareId<=55) && (firstSquareId+i<=55) ) ||
                ( (firstSquareId>=56 && firstSquareId<=63) && (firstSquareId+i<=63) ) 
                 )
             {
                 allSquares[firstSquareId+i].classList.add("possible");
             }
        }
 
        for(let i = 1; i<=7; i++)
        {
             if( 
                ( (firstSquareId>=0 && firstSquareId<=7) && (firstSquareId-i>=0) &&
                 ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) )  ||
 
                 ( (firstSquareId>=8 && firstSquareId<=15) && (firstSquareId-i>=8) &&
                 ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=16 && firstSquareId<=23) && (firstSquareId-i>=16) &&
                 ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=24 && firstSquareId<=31) && (firstSquareId-i>=24) &&
                 ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=32 && firstSquareId<=39) && (firstSquareId-i>=32) &&
                 ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=40 && firstSquareId<=47) && (firstSquareId-i>=40) &&
                 ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=48 && firstSquareId<=55) && (firstSquareId-i>=48) &&
                 ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=56 && firstSquareId<=63) && (firstSquareId-i>=56) &&
                 ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) ) 
             )
             {
                 if(allSquares[firstSquareId-i].classList.contains("black"))
                     allSquares[firstSquareId-i].classList.add("possible");
                 break;
             }
             else if( 
                ( (firstSquareId>=0 && firstSquareId<=7) &&(firstSquareId-i>=0) ) || 
                ( (firstSquareId>=8 && firstSquareId<=15) && (firstSquareId-i>=8) ) ||
                ( (firstSquareId>=16 && firstSquareId<=23) && (firstSquareId-i>=16) ) ||
                ( (firstSquareId>=24 && firstSquareId<=31) && (firstSquareId-i>=24) ) ||
                ( (firstSquareId>=32 && firstSquareId<=39) && (firstSquareId-i>=32) ) ||
                ( (firstSquareId>=40 && firstSquareId<=47) && (firstSquareId-i>=40) ) ||
                ( (firstSquareId>=48 && firstSquareId<=55) && (firstSquareId-i>=48) ) ||
                ( (firstSquareId>=56 && firstSquareId<=63) && (firstSquareId-i>=56) ) 
                 )
             {
                 allSquares[firstSquareId-i].classList.add("possible");
             }
        }

        //bishop part
        for(let i = 1; i<=7; i++)
        {
             if( firstSquareId-i*7>=0 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId-i*7].style.backgroundColor) &&
                 ( allSquares[firstSquareId-i*7].classList.contains("white") || allSquares[firstSquareId-i*7].classList.contains("black") )
             )
             {
                 if(allSquares[firstSquareId-i*7].classList.contains("black"))
                     allSquares[firstSquareId-i*7].classList.add("possible");
                 break;
             }
             else if(
                 firstSquareId-i*7>=0
                 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId-i*7].style.backgroundColor)
                 )
             {   
                 allSquares[firstSquareId-i*7].classList.add("possible");
             }
        }

        for(let i = 1; i<=7; i++)
        {
             if( firstSquareId+i*7<=63 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId+i*7].style.backgroundColor) &&
                 ( allSquares[firstSquareId+i*7].classList.contains("white") || allSquares[firstSquareId+i*7].classList.contains("black") )
             )
             {
                 if(allSquares[firstSquareId+i*7].classList.contains("black"))
                     allSquares[firstSquareId+i*7].classList.add("possible");
                 break;
             }
             else if(
                 firstSquareId+i*7<=63
                 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId+i*7].style.backgroundColor)
                 )
             {   
                 allSquares[firstSquareId+i*7].classList.add("possible");
             }
        }

        for(let i = 1; i<=7; i++)
        {
             if( firstSquareId+i*9<=63 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId+i*9].style.backgroundColor) &&
                 ( allSquares[firstSquareId+i*9].classList.contains("white") || allSquares[firstSquareId+i*9].classList.contains("black") )
             )
             {
                 if(allSquares[firstSquareId+i*9].classList.contains("black"))
                     allSquares[firstSquareId+i*9].classList.add("possible");
                 break;
             }
             else if(
                 firstSquareId+i*9<=63
                 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId+i*9].style.backgroundColor)
                 )
             {   
                 allSquares[firstSquareId+i*9].classList.add("possible");
             }
        }

        for(let i = 1; i<=7; i++)
        {
             if( firstSquareId-i*9>=0 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId-i*9].style.backgroundColor) &&
                 ( allSquares[firstSquareId-i*9].classList.contains("white") || allSquares[firstSquareId-i*9].classList.contains("black") )
             )
             {
                 if(allSquares[firstSquareId-i*9].classList.contains("black"))
                     allSquares[firstSquareId-i*9].classList.add("possible");
                 break;
             }
             else if(
                 firstSquareId-i*9>=0
                 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId-i*9].style.backgroundColor)
                 )
             {   
                 allSquares[firstSquareId-i*9].classList.add("possible");
             }
        }
     }

     function whiteKingPossibleMoveCheck(firstSquare, firstSquareId){
        if(
           firstSquareId+8 <= 63 && !allSquares[firstSquareId+8].classList.contains("white") &&
           !allSquares[firstSquareId+8].classList.contains("checkedByBlack")
        )
        {
           allSquares[firstSquareId+8].classList.add("possible");
        }

        if(
           firstSquareId-8 >= 0 && !allSquares[firstSquareId-8].classList.contains("white") &&
           !allSquares[firstSquareId-8].classList.contains("checkedByBlack")
        )
        {
           allSquares[firstSquareId-8].classList.add("possible");
        }

        if(
           firstSquareId-1 >= 0 && 
           (
               (firstSquareId > 0 &&firstSquareId <= 7) || (firstSquareId > 8 &&firstSquareId <= 15) || (firstSquareId > 16 &&firstSquareId <= 23) ||
               (firstSquareId > 24 &&firstSquareId <= 31) || (firstSquareId > 32 &&firstSquareId <= 39) || (firstSquareId > 40 &&firstSquareId <= 47) ||
               (firstSquareId > 48 &&firstSquareId <= 55) || (firstSquareId > 56 &&firstSquareId <= 63) 
           ) && 
           !allSquares[firstSquareId-1].classList.contains("white") &&
           !allSquares[firstSquareId-1].classList.contains("checkedByBlack")
        )
        {
           allSquares[firstSquareId-1].classList.add("possible");
        }

        if(
           firstSquareId-9 >= 0 && 
           (
               (firstSquareId > 0 &&firstSquareId <= 7) || (firstSquareId > 8 &&firstSquareId <= 15) || (firstSquareId > 16 &&firstSquareId <= 23) ||
               (firstSquareId > 24 &&firstSquareId <= 31) || (firstSquareId > 32 &&firstSquareId <= 39) || (firstSquareId > 40 &&firstSquareId <= 47) ||
               (firstSquareId > 48 &&firstSquareId <= 55) || (firstSquareId > 56 &&firstSquareId <= 63) 
           ) && 
           !allSquares[firstSquareId-9].classList.contains("white") &&
           !allSquares[firstSquareId-9].classList.contains("checkedByBlack")
        )
        {
           allSquares[firstSquareId-9].classList.add("possible");
        }

        if(
           firstSquareId+7 <=63 && 
           (
               (firstSquareId > 0 &&firstSquareId <= 7) || (firstSquareId > 8 &&firstSquareId <= 15) || (firstSquareId > 16 &&firstSquareId <= 23) ||
               (firstSquareId > 24 &&firstSquareId <= 31) || (firstSquareId > 32 &&firstSquareId <= 39) || (firstSquareId > 40 &&firstSquareId <= 47) ||
               (firstSquareId > 48 &&firstSquareId <= 55) || (firstSquareId > 56 &&firstSquareId <= 63) 
           ) && 
           !allSquares[firstSquareId+7].classList.contains("white") &&
           !allSquares[firstSquareId+7].classList.contains("checkedByBlack")
        )
        {
           allSquares[firstSquareId+7].classList.add("possible");
        }

        if(
           firstSquareId + 1 <= 63 &&
           (
               (firstSquareId >= 0 &&firstSquareId < 7) || (firstSquareId >= 8 &&firstSquareId < 15) || (firstSquareId >= 16 &&firstSquareId < 23) ||
               (firstSquareId >= 24 &&firstSquareId < 31) || (firstSquareId >= 32 &&firstSquareId < 39) || (firstSquareId >= 40 &&firstSquareId < 47) ||
               (firstSquareId >= 48 &&firstSquareId < 55) || (firstSquareId >= 56 &&firstSquareId < 63) 
           ) && 
           !allSquares[firstSquareId+1].classList.contains("white")&&
           !allSquares[firstSquareId+1].classList.contains("checkedByBlack")
        )
        {
           allSquares[firstSquareId+1].classList.add("possible");
        }

        if(
           firstSquareId + 9 <= 63 &&
           (
               (firstSquareId >= 0 &&firstSquareId < 7) || (firstSquareId >= 8 &&firstSquareId < 15) || (firstSquareId >= 16 &&firstSquareId < 23) ||
               (firstSquareId >= 24 &&firstSquareId < 31) || (firstSquareId >= 32 &&firstSquareId < 39) || (firstSquareId >= 40 &&firstSquareId < 47) ||
               (firstSquareId >= 48 &&firstSquareId < 55) || (firstSquareId >= 56 &&firstSquareId < 63) 
           ) && 
           !allSquares[firstSquareId+9].classList.contains("white")&&
           !allSquares[firstSquareId+9].classList.contains("checkedByBlack")
        )
        {
           allSquares[firstSquareId+9].classList.add("possible");
        }

        if(
           firstSquareId - 7 >= 0 &&
           (
               (firstSquareId >= 0 &&firstSquareId < 7) || (firstSquareId >= 8 &&firstSquareId < 15) || (firstSquareId >= 16 &&firstSquareId < 23) ||
               (firstSquareId >= 24 &&firstSquareId < 31) || (firstSquareId >= 32 &&firstSquareId < 39) || (firstSquareId >= 40 &&firstSquareId < 47) ||
               (firstSquareId >= 48 &&firstSquareId < 55) || (firstSquareId >= 56 &&firstSquareId < 63) 
           ) && 
           !allSquares[firstSquareId-7].classList.contains("white")&&
           !allSquares[firstSquareId-7].classList.contains("checkedByBlack")
        )
        {
           allSquares[firstSquareId-7].classList.add("possible");
        }

    }

    //black pieces

    function  blackPawnPossibleMoveCheck(firstSquare, firstSquareId){
        if( !allSquares[firstSquareId+8].classList.contains("white") && !allSquares[firstSquareId+8].classList.contains("black"))
        {
            allSquares[firstSquareId+8].classList.add("possible");
        }

        if( allSquares[firstSquareId+7].classList.contains("white") && 
        (
          ( (firstSquareId >= 48 && firstSquareId <= 55) && (firstSquareId+7 >= 56 && firstSquareId+7 <= 63) ) ||
          ( (firstSquareId >= 40 && firstSquareId <= 47) && (firstSquareId+7 >= 48 && firstSquareId+7 <= 55) ) ||
          ( (firstSquareId >= 32 && firstSquareId <= 39) && (firstSquareId+7 >= 40 && firstSquareId+7 <= 47) ) ||
          ( (firstSquareId >= 24 && firstSquareId <= 31) && (firstSquareId+7 >= 32 && firstSquareId+7 <= 39) ) ||
          ( (firstSquareId >= 16 && firstSquareId <= 23) && (firstSquareId+7 >= 24 && firstSquareId+7 <= 31) ) ||
          ( (firstSquareId >= 8 && firstSquareId <= 15) && (firstSquareId+7 >= 16 && firstSquareId+7 <= 23) ) 
        )
    )
    {
        allSquares[firstSquareId+7].classList.add("possible");
    }

    if( allSquares[firstSquareId+9].classList.contains("white") && 
    (
      ( (firstSquareId >= 48 && firstSquareId <= 55) && (firstSquareId+9 >= 56 && firstSquareId+9 <= 63) ) ||
      ( (firstSquareId >= 40 && firstSquareId <= 47) && (firstSquareId+9 >= 48 && firstSquareId+9 <= 55) ) ||
      ( (firstSquareId >= 32 && firstSquareId <= 39) && (firstSquareId+9 >= 40 && firstSquareId+9 <= 47) ) ||
      ( (firstSquareId >= 24 && firstSquareId <= 31) && (firstSquareId+9 >= 32 && firstSquareId+9 <= 39) ) ||
      ( (firstSquareId >= 16 && firstSquareId <= 23) && (firstSquareId+9 >= 24 && firstSquareId+9 <= 31) ) ||
      ( (firstSquareId >= 8 && firstSquareId <= 15) && (firstSquareId+9 >= 16 && firstSquareId+9 <= 23) ) 
    )
)
{
    allSquares[firstSquareId+9].classList.add("possible");
}
   
        if(
            firstSquareId <= 15 && firstSquareId >= 8 &&
            ( !allSquares[firstSquareId+8].classList.contains("white") && !allSquares[firstSquareId+8].classList.contains("black")) &&
            ( !allSquares[firstSquareId+16].classList.contains("white") && !allSquares[firstSquareId+16].classList.contains("black"))
        )
        {
            allSquares[firstSquareId+16].classList.add("possible");
        }
        
    }

    //white and black rook uses same code
    function  blackRookPossibleMoveCheck(firstSquare, firstSquareId){
        for(let i = 1; i<=7; i++)
        {
             if( firstSquareId-i*8>=0 &&
                 ( allSquares[firstSquareId-i*8].classList.contains("white") || allSquares[firstSquareId-i*8].classList.contains("black") )
             )
             {
                 if( allSquares[firstSquareId-i*8].classList.contains("white"))
                 allSquares[firstSquareId-i*8].classList.add("possible")
                 break;
             }
             else if(firstSquareId-i*8>=0)
             {   
                 allSquares[firstSquareId-i*8].classList.add("possible");
             }
        }
 
        for(let i = 1; i<=7; i++)
        {
             if( firstSquareId+i*8<=63 &&
                 ( allSquares[firstSquareId+i*8].classList.contains("white") || allSquares[firstSquareId+i*8].classList.contains("black") )
             )
             {
                if( allSquares[firstSquareId+i*8].classList.contains("white"))
                allSquares[firstSquareId+i*8].classList.add("possible")
                 break;
             }
             else if(firstSquareId+i*8<=63 )
             {
                 allSquares[firstSquareId+i*8].classList.add("possible");
             }
        }
 
        for(let i = 1; i<=7; i++)
        {
             if( 
                ( (firstSquareId>=0 && firstSquareId<=7) && (firstSquareId+i<=7) &&
                 ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) )  ||
 
                 ( (firstSquareId>=8 && firstSquareId<=15) && (firstSquareId+i<=15) &&
                 ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=16 && firstSquareId<=23) && (firstSquareId+i<=23) &&
                 ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=24 && firstSquareId<=31) && (firstSquareId+i<=31) &&
                 ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=32 && firstSquareId<=39) && (firstSquareId+i<=39) &&
                 ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=40 && firstSquareId<=47) && (firstSquareId+i<=47) &&
                 ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=48 && firstSquareId<=55) && (firstSquareId+i<=55) &&
                 ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=56 && firstSquareId<=63) && (firstSquareId+i<=63) &&
                 ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) ) 
             )
             {
                if( allSquares[firstSquareId+i].classList.contains("white"))
                allSquares[firstSquareId+i].classList.add("possible")
                 break;
             }
             else if( 
                ( (firstSquareId>=0 && firstSquareId<=7) && (firstSquareId+i<=7) ) || 
                ( (firstSquareId>=8 && firstSquareId<=15) && (firstSquareId+i<=15) ) ||
                ( (firstSquareId>=16 && firstSquareId<=23) && (firstSquareId+i<=23) ) ||
                ( (firstSquareId>=24 && firstSquareId<=31) && (firstSquareId+i<=31) ) ||
                ( (firstSquareId>=32 && firstSquareId<=39) && (firstSquareId+i<=39) ) ||
                ( (firstSquareId>=40 && firstSquareId<=47) && (firstSquareId+i<=47) ) ||
                ( (firstSquareId>=48 && firstSquareId<=55) && (firstSquareId+i<=55) ) ||
                ( (firstSquareId>=56 && firstSquareId<=63) && (firstSquareId+i<=63) ) 
                 )
             {
                 allSquares[firstSquareId+i].classList.add("possible");
             }
        }
 
        for(let i = 1; i<=7; i++)
        {
             if( 
                ( (firstSquareId>=0 && firstSquareId<=7) && (firstSquareId-i>=0) &&
                 ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) )  ||
 
                 ( (firstSquareId>=8 && firstSquareId<=15) && (firstSquareId-i>=8) &&
                 ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=16 && firstSquareId<=23) && (firstSquareId-i>=16) &&
                 ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=24 && firstSquareId<=31) && (firstSquareId-i>=24) &&
                 ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=32 && firstSquareId<=39) && (firstSquareId-i>=32) &&
                 ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=40 && firstSquareId<=47) && (firstSquareId-i>=40) &&
                 ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=48 && firstSquareId<=55) && (firstSquareId-i>=48) &&
                 ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=56 && firstSquareId<=63) && (firstSquareId-i>=56) &&
                 ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) ) 
             )
             {
                if( allSquares[firstSquareId-i].classList.contains("white"))
                allSquares[firstSquareId-i].classList.add("possible")
                 break;
             }
             else if( 
                ( (firstSquareId>=0 && firstSquareId<=7) &&(firstSquareId-i>=0) ) || 
                ( (firstSquareId>=8 && firstSquareId<=15) && (firstSquareId-i>=8) ) ||
                ( (firstSquareId>=16 && firstSquareId<=23) && (firstSquareId-i>=16) ) ||
                ( (firstSquareId>=24 && firstSquareId<=31) && (firstSquareId-i>=24) ) ||
                ( (firstSquareId>=32 && firstSquareId<=39) && (firstSquareId-i>=32) ) ||
                ( (firstSquareId>=40 && firstSquareId<=47) && (firstSquareId-i>=40) ) ||
                ( (firstSquareId>=48 && firstSquareId<=55) && (firstSquareId-i>=48) ) ||
                ( (firstSquareId>=56 && firstSquareId<=63) && (firstSquareId-i>=56) ) 
                 )
             {
                 allSquares[firstSquareId-i].classList.add("possible");
             }
        }
    }

    function blackBishopPossibleMoveCheck(firstSquare, firstSquareId){

        for(let i = 1; i<=7; i++)
        {
             if( firstSquareId-i*7>=0 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId-i*7].style.backgroundColor) &&
                 ( allSquares[firstSquareId-i*7].classList.contains("white") || allSquares[firstSquareId-i*7].classList.contains("black") )
             )
             {
                 if(allSquares[firstSquareId-i*7].classList.contains("white"))
                     allSquares[firstSquareId-i*7].classList.add("possible");
                 break;
             }
             else if(
                 firstSquareId-i*7>=0
                 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId-i*7].style.backgroundColor)
                 )
             {   
                 allSquares[firstSquareId-i*7].classList.add("possible");
             }
        }

        for(let i = 1; i<=7; i++)
        {
             if( firstSquareId+i*7<=63 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId+i*7].style.backgroundColor) &&
                 ( allSquares[firstSquareId+i*7].classList.contains("white") || allSquares[firstSquareId+i*7].classList.contains("black") )
             )
             {
                 if(allSquares[firstSquareId+i*7].classList.contains("white"))
                     allSquares[firstSquareId+i*7].classList.add("possible");
                 break;
             }
             else if(
                 firstSquareId+i*7<=63
                 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId+i*7].style.backgroundColor)
                 )
             {   
                 allSquares[firstSquareId+i*7].classList.add("possible");
             }
        }

        for(let i = 1; i<=7; i++)
        {
             if( firstSquareId+i*9<=63 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId+i*9].style.backgroundColor) &&
                 ( allSquares[firstSquareId+i*9].classList.contains("white") || allSquares[firstSquareId+i*9].classList.contains("black") )
             )
             {
                 if(allSquares[firstSquareId+i*9].classList.contains("white"))
                     allSquares[firstSquareId+i*9].classList.add("possible");
                 break;
             }
             else if(
                 firstSquareId+i*9<=63
                 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId+i*9].style.backgroundColor)
                 )
             {   
                 allSquares[firstSquareId+i*9].classList.add("possible");
             }
        }

        for(let i = 1; i<=7; i++)
        {
             if( firstSquareId-i*9>=0 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId-i*9].style.backgroundColor) &&
                 ( allSquares[firstSquareId-i*9].classList.contains("white") || allSquares[firstSquareId-i*9].classList.contains("black") )
             )
             {
                 if(allSquares[firstSquareId-i*9].classList.contains("white"))
                     allSquares[firstSquareId-i*9].classList.add("possible");
                 break;
             }
             else if(
                 firstSquareId-i*9>=0
                 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId-i*9].style.backgroundColor)
                 )
             {   
                 allSquares[firstSquareId-i*9].classList.add("possible");
             }
        }

    }

    function blackKnightPossibleMoveCheck(firstSquare, firstSquareId){

        if(
            ( firstSquareId-15>=0 && firstSquareId-15<=63 ) &&
            (
                (firstSquareId >= 0 && firstSquareId <7) || (firstSquareId >= 8 && firstSquareId <15) || (firstSquareId >= 16 && firstSquareId <23) ||
                (firstSquareId >= 24 && firstSquareId <31) || (firstSquareId >= 32 && firstSquareId <39) ||(firstSquareId >= 40 && firstSquareId <47) || 
                (firstSquareId >= 48 && firstSquareId <55) || (firstSquareId >= 56 && firstSquareId <63)
            ) &&
            !allSquares[firstSquareId-15].classList.contains("black") 
        )
        {
            allSquares[firstSquareId-15].classList.add("possible");
        }

        if(
            ( firstSquareId+15>=0 && firstSquareId+15<=63 ) &&
            (
                (firstSquareId > 0 && firstSquareId <=7) || (firstSquareId > 8 && firstSquareId <=15) || (firstSquareId > 16 && firstSquareId <=23) ||
                (firstSquareId > 24 && firstSquareId <=31) || (firstSquareId > 32 && firstSquareId <=39) ||(firstSquareId > 40 && firstSquareId <=47) || 
                (firstSquareId > 48 && firstSquareId <=55) || (firstSquareId > 56 && firstSquareId <=63)
            ) &&
            !allSquares[firstSquareId+15].classList.contains("black")
        )
        {
            allSquares[firstSquareId+15].classList.add("possible");
        }

        if(
            ( firstSquareId-17>=0 && firstSquareId-17<=63 ) &&
            (
                (firstSquareId > 0 && firstSquareId <=7) || (firstSquareId > 8 && firstSquareId <=15) || (firstSquareId > 16 && firstSquareId <=23) ||
                (firstSquareId > 24 && firstSquareId <=31) || (firstSquareId > 32 && firstSquareId <=39) ||(firstSquareId > 40 && firstSquareId <=47) || 
                (firstSquareId > 48 && firstSquareId <=55) || (firstSquareId > 56 && firstSquareId <=63)
            ) &&
            !allSquares[firstSquareId-17].classList.contains("black")
            )
        {
            allSquares[firstSquareId-17].classList.add("possible");
        }

        if(
            ( firstSquareId+17>=0 && firstSquareId+17<=63 ) &&
            (
                (firstSquareId >= 0 && firstSquareId <7) || (firstSquareId >= 8 && firstSquareId <15) || (firstSquareId >= 16 && firstSquareId <23) ||
                (firstSquareId >= 24 && firstSquareId <31) || (firstSquareId >= 32 && firstSquareId <39) ||(firstSquareId >= 40 && firstSquareId <47) || 
                (firstSquareId >= 48 && firstSquareId <55) || (firstSquareId >= 56 && firstSquareId <63)
            ) &&
            !allSquares[firstSquareId+17].classList.contains("black")
        )
        {
            allSquares[firstSquareId+17].classList.add("possible");
        }

        if(
            ( firstSquareId+6>=0 && firstSquareId+6<=63 ) && 
            (
                (firstSquareId > 1 && firstSquareId <=7) || (firstSquareId > 9 && firstSquareId <=15) || (firstSquareId > 17 && firstSquareId <=23) ||
                (firstSquareId > 25 && firstSquareId <=31) || (firstSquareId > 33 && firstSquareId <=39) ||(firstSquareId > 41 && firstSquareId <=47) || 
                (firstSquareId > 49 && firstSquareId <=55) || (firstSquareId > 57 && firstSquareId <=63)
            ) &&
            !allSquares[firstSquareId+6].classList.contains("black")
        )
        {
            allSquares[firstSquareId+6].classList.add("possible");
        }

        if(
            ( firstSquareId-6>=0 && firstSquareId-6<=63 ) && 
            (
                (firstSquareId >= 0 && firstSquareId <6) || (firstSquareId >= 8 && firstSquareId <14) || (firstSquareId >= 16 && firstSquareId <22) ||
                (firstSquareId >= 24 && firstSquareId <30) || (firstSquareId >= 32 && firstSquareId <38) ||(firstSquareId >= 40 && firstSquareId <46) || 
                (firstSquareId >= 48 && firstSquareId <54) || (firstSquareId >= 56 && firstSquareId <62)
            ) &&
            !allSquares[firstSquareId-6].classList.contains("black")
        )
        {
            allSquares[firstSquareId-6].classList.add("possible");
        }

        if(
            ( firstSquareId-10>=0 && firstSquareId-10<=63 ) &&
            (
                (firstSquareId > 1 && firstSquareId <=7) || (firstSquareId > 9 && firstSquareId <=15) || (firstSquareId > 17 && firstSquareId <=23) ||
                (firstSquareId > 25 && firstSquareId <=31) || (firstSquareId > 33 && firstSquareId <=39) ||(firstSquareId > 41 && firstSquareId <=47) || 
                (firstSquareId > 49 && firstSquareId <=55) || (firstSquareId > 57 && firstSquareId <=63)
            ) &&
            !allSquares[firstSquareId-10].classList.contains("black")
        )
        {
            allSquares[firstSquareId-10].classList.add("possible");
        }

        if(
            ( firstSquareId+10>=0 && firstSquareId+10<=63 ) &&
            (
                (firstSquareId >= 0 && firstSquareId <6) || (firstSquareId >= 8 && firstSquareId <14) || (firstSquareId >= 16 && firstSquareId <22) ||
                (firstSquareId >= 24 && firstSquareId <30) || (firstSquareId >= 32 && firstSquareId <38) ||(firstSquareId >= 40 && firstSquareId <46) || 
                (firstSquareId >= 48 && firstSquareId <54) || (firstSquareId >= 56 && firstSquareId <62)
            ) &&
            !allSquares[firstSquareId+10].classList.contains("black")
        )
        {
            allSquares[firstSquareId+10].classList.add("possible");
        }

    
 }

    function blackQueenPossibleMoveCheck(firstSquare, firstSquareId){

        //rook part
        for(let i = 1; i<=7; i++)
        {
             if( firstSquareId-i*8>=0 &&
                 ( allSquares[firstSquareId-i*8].classList.contains("white") || allSquares[firstSquareId-i*8].classList.contains("black") )
             )
             {
                 if(allSquares[firstSquareId-i*8].classList.contains("white"))
                     allSquares[firstSquareId-i*8].classList.add("possible");
                 break;
             }
             else if(firstSquareId-i*8>=0)
             {   
                 allSquares[firstSquareId-i*8].classList.add("possible");
             }
        }
 
        for(let i = 1; i<=7; i++)
        {
             if( firstSquareId+i*8<=63 &&
                 ( allSquares[firstSquareId+i*8].classList.contains("white") || allSquares[firstSquareId+i*8].classList.contains("black") )
             )
             {
                 if(allSquares[firstSquareId+i*8].classList.contains("white"))
                     allSquares[firstSquareId+i*8].classList.add("possible");
                 break;
             }
             else if(firstSquareId+i*8<=63 )
             {
                 allSquares[firstSquareId+i*8].classList.add("possible");
             }
        }
 
        for(let i = 1; i<=7; i++)
        {
             if( 
                ( (firstSquareId>=0 && firstSquareId<=7) && (firstSquareId+i<=7) &&
                 ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) )  ||
 
                 ( (firstSquareId>=8 && firstSquareId<=15) && (firstSquareId+i<=15) &&
                 ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=16 && firstSquareId<=23) && (firstSquareId+i<=23) &&
                 ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=24 && firstSquareId<=31) && (firstSquareId+i<=31) &&
                 ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=32 && firstSquareId<=39) && (firstSquareId+i<=39) &&
                 ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=40 && firstSquareId<=47) && (firstSquareId+i<=47) &&
                 ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=48 && firstSquareId<=55) && (firstSquareId+i<=55) &&
                 ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=56 && firstSquareId<=63) && (firstSquareId+i<=63) &&
                 ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) ) 
             )
             {
                 if(allSquares[firstSquareId+i].classList.contains("white"))
                     allSquares[firstSquareId+i].classList.add("possible");
                 break;
             }
             else if( 
                ( (firstSquareId>=0 && firstSquareId<=7) && (firstSquareId+i<=7) ) || 
                ( (firstSquareId>=8 && firstSquareId<=15) && (firstSquareId+i<=15) ) ||
                ( (firstSquareId>=16 && firstSquareId<=23) && (firstSquareId+i<=23) ) ||
                ( (firstSquareId>=24 && firstSquareId<=31) && (firstSquareId+i<=31) ) ||
                ( (firstSquareId>=32 && firstSquareId<=39) && (firstSquareId+i<=39) ) ||
                ( (firstSquareId>=40 && firstSquareId<=47) && (firstSquareId+i<=47) ) ||
                ( (firstSquareId>=48 && firstSquareId<=55) && (firstSquareId+i<=55) ) ||
                ( (firstSquareId>=56 && firstSquareId<=63) && (firstSquareId+i<=63) ) 
                 )
             {
                 allSquares[firstSquareId+i].classList.add("possible");
             }
        }
 
        for(let i = 1; i<=7; i++)
        {
             if( 
                ( (firstSquareId>=0 && firstSquareId<=7) && (firstSquareId-i>=0) &&
                 ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) )  ||
 
                 ( (firstSquareId>=8 && firstSquareId<=15) && (firstSquareId-i>=8) &&
                 ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=16 && firstSquareId<=23) && (firstSquareId-i>=16) &&
                 ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=24 && firstSquareId<=31) && (firstSquareId-i>=24) &&
                 ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=32 && firstSquareId<=39) && (firstSquareId-i>=32) &&
                 ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=40 && firstSquareId<=47) && (firstSquareId-i>=40) &&
                 ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=48 && firstSquareId<=55) && (firstSquareId-i>=48) &&
                 ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=56 && firstSquareId<=63) && (firstSquareId-i>=56) &&
                 ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) ) 
             )
             {
                 if(allSquares[firstSquareId-i].classList.contains("white"))
                     allSquares[firstSquareId-i].classList.add("possible");
                 break;
             }
             else if( 
                ( (firstSquareId>=0 && firstSquareId<=7) &&(firstSquareId-i>=0) ) || 
                ( (firstSquareId>=8 && firstSquareId<=15) && (firstSquareId-i>=8) ) ||
                ( (firstSquareId>=16 && firstSquareId<=23) && (firstSquareId-i>=16) ) ||
                ( (firstSquareId>=24 && firstSquareId<=31) && (firstSquareId-i>=24) ) ||
                ( (firstSquareId>=32 && firstSquareId<=39) && (firstSquareId-i>=32) ) ||
                ( (firstSquareId>=40 && firstSquareId<=47) && (firstSquareId-i>=40) ) ||
                ( (firstSquareId>=48 && firstSquareId<=55) && (firstSquareId-i>=48) ) ||
                ( (firstSquareId>=56 && firstSquareId<=63) && (firstSquareId-i>=56) ) 
                 )
             {
                 allSquares[firstSquareId-i].classList.add("possible");
             }
        }

        //bishop part
        for(let i = 1; i<=7; i++)
        {
             if( firstSquareId-i*7>=0 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId-i*7].style.backgroundColor) &&
                 ( allSquares[firstSquareId-i*7].classList.contains("white") || allSquares[firstSquareId-i*7].classList.contains("black") )
             )
             {
                 if(allSquares[firstSquareId-i*7].classList.contains("white"))
                     allSquares[firstSquareId-i*7].classList.add("possible");
                 break;
             }
             else if(
                 firstSquareId-i*7>=0
                 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId-i*7].style.backgroundColor)
                 )
             {   
                 allSquares[firstSquareId-i*7].classList.add("possible");
             }
        }

        for(let i = 1; i<=7; i++)
        {
             if( firstSquareId+i*7<=63 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId+i*7].style.backgroundColor) &&
                 ( allSquares[firstSquareId+i*7].classList.contains("white") || allSquares[firstSquareId+i*7].classList.contains("black") )
             )
             {
                 if(allSquares[firstSquareId+i*7].classList.contains("white"))
                     allSquares[firstSquareId+i*7].classList.add("possible");
                 break;
             }
             else if(
                 firstSquareId+i*7<=63
                 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId+i*7].style.backgroundColor)
                 )
             {   
                 allSquares[firstSquareId+i*7].classList.add("possible");
             }
        }

        for(let i = 1; i<=7; i++)
        {
             if( firstSquareId+i*9<=63 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId+i*9].style.backgroundColor) &&
                 ( allSquares[firstSquareId+i*9].classList.contains("white") || allSquares[firstSquareId+i*9].classList.contains("black") )
             )
             {
                 if(allSquares[firstSquareId+i*9].classList.contains("white"))
                     allSquares[firstSquareId+i*9].classList.add("possible");
                 break;
             }
             else if(
                 firstSquareId+i*9<=63
                 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId+i*9].style.backgroundColor)
                 )
             {   
                 allSquares[firstSquareId+i*9].classList.add("possible");
             }
        }

        for(let i = 1; i<=7; i++)
        {
             if( firstSquareId-i*9>=0 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId-i*9].style.backgroundColor) &&
                 ( allSquares[firstSquareId-i*9].classList.contains("white") || allSquares[firstSquareId-i*9].classList.contains("black") )
             )
             {
                 if(allSquares[firstSquareId-i*9].classList.contains("white"))
                     allSquares[firstSquareId-i*9].classList.add("possible");
                 break;
             }
             else if(
                 firstSquareId-i*9>=0
                 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId-i*9].style.backgroundColor)
                 )
             {   
                 allSquares[firstSquareId-i*9].classList.add("possible");
             }
        }
     }

    function  blackKingPossibleMoveCheck(firstSquare, firstSquareId){
        if(
            firstSquareId+8 <= 63 && !allSquares[firstSquareId+8].classList.contains("black") &&
            !allSquares[firstSquareId+8].classList.contains("checkedByWhite")
         )
         {
            allSquares[firstSquareId+8].classList.add("possible");
         }
 
         if(
            firstSquareId-8 >= 0 && !allSquares[firstSquareId-8].classList.contains("black") &&
            !allSquares[firstSquareId-8].classList.contains("checkedByWhite")
         )
         {
            allSquares[firstSquareId-8].classList.add("possible");
         }
 
         if(
            firstSquareId-1 >= 0 && 
            (
                (firstSquareId > 0 &&firstSquareId <= 7) || (firstSquareId > 8 &&firstSquareId <= 15) || (firstSquareId > 16 &&firstSquareId <= 23) ||
                (firstSquareId > 24 &&firstSquareId <= 31) || (firstSquareId > 32 &&firstSquareId <= 39) || (firstSquareId > 40 &&firstSquareId <= 47) ||
                (firstSquareId > 48 &&firstSquareId <= 55) || (firstSquareId > 56 &&firstSquareId <= 63) 
            ) && 
            !allSquares[firstSquareId-1].classList.contains("black") &&
            !allSquares[firstSquareId-1].classList.contains("checkedByWhite")
         )
         {
            allSquares[firstSquareId-1].classList.add("possible");
         }
 
         if(
            firstSquareId-9 >= 0 && 
            (
                (firstSquareId > 0 &&firstSquareId <= 7) || (firstSquareId > 8 &&firstSquareId <= 15) || (firstSquareId > 16 &&firstSquareId <= 23) ||
                (firstSquareId > 24 &&firstSquareId <= 31) || (firstSquareId > 32 &&firstSquareId <= 39) || (firstSquareId > 40 &&firstSquareId <= 47) ||
                (firstSquareId > 48 &&firstSquareId <= 55) || (firstSquareId > 56 &&firstSquareId <= 63) 
            ) && 
            !allSquares[firstSquareId-9].classList.contains("black") &&
            !allSquares[firstSquareId-9].classList.contains("checkedByWhite")
         )
         {
            allSquares[firstSquareId-9].classList.add("possible");
         }
 
         if(
            firstSquareId+7 <=63 && 
            (
                (firstSquareId > 0 &&firstSquareId <= 7) || (firstSquareId > 8 &&firstSquareId <= 15) || (firstSquareId > 16 &&firstSquareId <= 23) ||
                (firstSquareId > 24 &&firstSquareId <= 31) || (firstSquareId > 32 &&firstSquareId <= 39) || (firstSquareId > 40 &&firstSquareId <= 47) ||
                (firstSquareId > 48 &&firstSquareId <= 55) || (firstSquareId > 56 &&firstSquareId <= 63) 
            ) && 
            !allSquares[firstSquareId+7].classList.contains("black") &&
            !allSquares[firstSquareId+7].classList.contains("checkedByWhite")
         )
         {
            allSquares[firstSquareId+7].classList.add("possible");
         }
 
         if(
            firstSquareId + 1 <= 63 &&
            (
                (firstSquareId >= 0 &&firstSquareId < 7) || (firstSquareId >= 8 &&firstSquareId < 15) || (firstSquareId >= 16 &&firstSquareId < 23) ||
                (firstSquareId >= 24 &&firstSquareId < 31) || (firstSquareId >= 32 &&firstSquareId < 39) || (firstSquareId >= 40 &&firstSquareId < 47) ||
                (firstSquareId >= 48 &&firstSquareId < 55) || (firstSquareId >= 56 &&firstSquareId < 63) 
            ) && 
            !allSquares[firstSquareId+1].classList.contains("black")&&
            !allSquares[firstSquareId+1].classList.contains("checkedByWhite")
         )
         {
            allSquares[firstSquareId+1].classList.add("possible");
         }
 
         if(
            firstSquareId + 9 <= 63 &&
            (
                (firstSquareId >= 0 &&firstSquareId < 7) || (firstSquareId >= 8 &&firstSquareId < 15) || (firstSquareId >= 16 &&firstSquareId < 23) ||
                (firstSquareId >= 24 &&firstSquareId < 31) || (firstSquareId >= 32 &&firstSquareId < 39) || (firstSquareId >= 40 &&firstSquareId < 47) ||
                (firstSquareId >= 48 &&firstSquareId < 55) || (firstSquareId >= 56 &&firstSquareId < 63) 
            ) && 
            !allSquares[firstSquareId+9].classList.contains("black")&&
            !allSquares[firstSquareId+9].classList.contains("checkedByWhite")
         )
         {
            allSquares[firstSquareId+9].classList.add("possible");
         }
 
         if(
            firstSquareId - 7 >= 0 &&
            (
                (firstSquareId >= 0 &&firstSquareId < 7) || (firstSquareId >= 8 &&firstSquareId < 15) || (firstSquareId >= 16 &&firstSquareId < 23) ||
                (firstSquareId >= 24 &&firstSquareId < 31) || (firstSquareId >= 32 &&firstSquareId < 39) || (firstSquareId >= 40 &&firstSquareId < 47) ||
                (firstSquareId >= 48 &&firstSquareId < 55) || (firstSquareId >= 56 &&firstSquareId < 63) 
            ) && 
            !allSquares[firstSquareId-7].classList.contains("black")&&
            !allSquares[firstSquareId-7].classList.contains("checkedByWhite")
         )
         {
            allSquares[firstSquareId-7].classList.add("possible");
         }
    }


    //from here we remove possible move suggestions

    function removePossibleMove(){
        for(let i = 0; i<=63; i++)
        {
            allSquares[i].classList.remove("possible");
        }
    }

    //removing all king checks

    function removeAllKingCheck(){
        for(let i = 0; i<=63; i++)
        {
            allSquares[i].classList.remove("checkedByWhite");
            allSquares[i].classList.remove("checkedByBlack");
            allSquares[i].classList.remove("kingUnderCheck");
        }
    }


    //from here starts making moves
    function checkMove(firstSquare, secondSquare, firstSquareId, secondSquareId) {
        //white pieces
        if (firstSquare.classList.contains("white") && !secondSquare.classList.contains("white")) {
            whiteMoveCheck(firstSquare, secondSquare, firstSquareId, secondSquareId);
        }
        else if (firstSquare.classList.contains("black") && !secondSquare.classList.contains("black")) {

            blackMoveCheck(firstSquare, secondSquare, firstSquareId, secondSquareId);
        }
        else{
            turnForWhite = !turnForWhite;
        }

    }

    function whiteMoveCheck(firstSquare, secondSquare, firstSquareId, secondSquareId) {
        //white pawn movement
        if (firstSquare.classList.contains("whitePawn")) {
            
            whitePawnMoveCheck(firstSquare, secondSquare);
        }
        //white rook movement
        else if (firstSquare.classList.contains("whiteRook")) {
            whiteRookMoveCheck(firstSquare, secondSquare, firstSquareId, secondSquareId);
        }
        else if (firstSquare.classList.contains("whiteBishop")) {
            whiteBishopMoveCheck(firstSquare, secondSquare, firstSquareId, secondSquareId);
        }
        else if (firstSquare.classList.contains("whiteKnight")) {
            whiteKnightMoveCheck(firstSquare, secondSquare, firstSquareId, secondSquareId);
        }
        else if (firstSquare.classList.contains("whiteQueen")) {
            whiteQueenMoveCheck(firstSquare, secondSquare, firstSquareId, secondSquareId);
        }
        else if (firstSquare.classList.contains("whiteKing")) {
            whiteKingMoveCheck(firstSquare, secondSquare, firstSquareId, secondSquareId);
        }
    }

    function blackMoveCheck(firstSquare, secondSquare, firstSquareId, secondSquareId) {
        //black pawn movement
        if (firstSquare.classList.contains("blackPawn")) {
            blackPawnMoveCheck(firstSquare, secondSquare);
        }
        //black rook movement
        else if (firstSquare.classList.contains("blackRook")) {
            blackRookMoveCheck(firstSquare, secondSquare, firstSquareId, secondSquareId);
        }
        else if (firstSquare.classList.contains("blackBishop")) {
            blackBishopMoveCheck(firstSquare, secondSquare, firstSquareId, secondSquareId);
       
        }
        else if (firstSquare.classList.contains("blackKnight")) {
            blackKnightMoveCheck(firstSquare, secondSquare, firstSquareId, secondSquareId);
     
        }
        else if (firstSquare.classList.contains("blackQueen")) {
            blackQueenMoveCheck(firstSquare, secondSquare, firstSquareId, secondSquareId);
     
        }
        else if (firstSquare.classList.contains("blackKing")) {
            blackKingMoveCheck(firstSquare, secondSquare, firstSquareId, secondSquareId);
   
        }
    }

    //whhite movement

    function  whitePawnMoveCheck(firstSquare, secondSquare,){

        

        if(secondSquare.classList.contains("possible") && !secondSquare.classList.contains("blackKing"))
        {
           

            firstSquare.classList.remove("white");
            firstSquare.classList.remove("whitePawn");

            secondSquare.classList.remove("black");
            secondSquare.classList.remove("blackKing");
            secondSquare.classList.remove("blackQueen");
            secondSquare.classList.remove("blackBishop");
            secondSquare.classList.remove("blackKnight");
            secondSquare.classList.remove("blackRook");
            secondSquare.classList.remove("blackPawn");
            secondSquare.classList.add("white");
            secondSquare.classList.add("whitePawn");
        }
        else
        {
            turnForWhite = !turnForWhite;
        }
    }

    function whiteRookMoveCheck(firstSquare, secondSquare, firstSquareId, secondSquareId){

        if(secondSquare.classList.contains("possible") && !secondSquare.classList.contains("blackKing"))
        {
             //removing piece from first square
             firstSquare.classList.remove("white");
             firstSquare.classList.remove("whiteRook");

             //removing opponent pieces from second square
             secondSquare.classList.remove("black");
             secondSquare.classList.remove("blackKing");
             secondSquare.classList.remove("blackQueen");
             secondSquare.classList.remove("blackBishop");
             secondSquare.classList.remove("blackKnight");
             secondSquare.classList.remove("blackRook");
             secondSquare.classList.remove("blackPawn");
             //adding own pieces to second square
             secondSquare.classList.add("white");
             secondSquare.classList.add("whiteRook");
        }
        else
        {
            turnForWhite = !turnForWhite;
        }
    }

    function whiteBishopMoveCheck(firstSquare, secondSquare, firstSquareId, secondSquareId){
        if(secondSquare.classList.contains("possible") && !secondSquare.classList.contains("blackKing"))
        {
                //removing piece from first square
                firstSquare.classList.remove("white");
                firstSquare.classList.remove("whiteBishop");

                //removing opponent pieces from second square
                secondSquare.classList.remove("black");
                secondSquare.classList.remove("blackKing");
                secondSquare.classList.remove("blackQueen");
                secondSquare.classList.remove("blackBishop");
                secondSquare.classList.remove("blackKnight");
                secondSquare.classList.remove("blackRook");
                secondSquare.classList.remove("blackPawn");
                //adding own pieces to second square
                secondSquare.classList.add("white");
                secondSquare.classList.add("whiteBishop");
        }
        else
        {
            turnForWhite = !turnForWhite;
        }
    }

    function whiteKnightMoveCheck(firstSquare, secondSquare, firstSquareId, secondSquareId){
        if(secondSquare.classList.contains("possible") && !secondSquare.classList.contains("blackKing"))
        {
            firstSquare.classList.remove("white");
            firstSquare.classList.remove("whiteKnight");

            secondSquare.classList.remove("black");
            secondSquare.classList.remove("blackKing");
            secondSquare.classList.remove("blackQueen");
            secondSquare.classList.remove("blackBishop");
            secondSquare.classList.remove("blackKnight");
            secondSquare.classList.remove("blackRook");
            secondSquare.classList.remove("blackPawn");

            secondSquare.classList.add("white");
            secondSquare.classList.add("whiteKnight");
        }
        else
        {
            turnForWhite = !turnForWhite;
        }
    }

    function  whiteQueenMoveCheck(firstSquare, secondSquare, firstSquareId, secondSquareId){
        if(secondSquare.classList.contains("possible") && !secondSquare.classList.contains("blackKing"))
        {
            //removing piece from first square
            firstSquare.classList.remove("white");
            firstSquare.classList.remove("whiteQueen");

            //removing opponent pieces from second square
            secondSquare.classList.remove("black");
            secondSquare.classList.remove("blackKing");
            secondSquare.classList.remove("blackQueen");
            secondSquare.classList.remove("blackBishop");
            secondSquare.classList.remove("blackKnight");
            secondSquare.classList.remove("blackRook");
            secondSquare.classList.remove("blackPawn");
            //adding own pieces to second square
            secondSquare.classList.add("white");
            secondSquare.classList.add("whiteQueen");
        }
        else
        {
            turnForWhite = !turnForWhite;
        }
    }

    function whiteKingMoveCheck(firstSquare, secondSquare, firstSquareId, secondSquareId){
        if(secondSquare.classList.contains("possible") && !secondSquare.classList.contains("blackKing"))
        {
            firstSquare.classList.remove("white");
            firstSquare.classList.remove("whiteKing");

            secondSquare.classList.remove("black");
            secondSquare.classList.remove("blackKing");
            secondSquare.classList.remove("blackQueen");
            secondSquare.classList.remove("blackBishop");
            secondSquare.classList.remove("blackKnight");
            secondSquare.classList.remove("blackRook");
            secondSquare.classList.remove("blackPawn");
            secondSquare.classList.add("white");
            secondSquare.classList.add("whiteKing");
        }
        else
        {
            turnForWhite = !turnForWhite;
        }
    }



    //black pieces
    function  blackPawnMoveCheck(firstSquare, secondSquare){

        if(secondSquare.classList.contains("possible") && !secondSquare.classList.contains("whiteKing"))
        {
            firstSquare.classList.remove("black");
            firstSquare.classList.remove("blackPawn");

            secondSquare.classList.remove("white");
            secondSquare.classList.remove("whiteKing");
            secondSquare.classList.remove("whiteQueen");
            secondSquare.classList.remove("whiteBishop");
            secondSquare.classList.remove("whiteKnight");
            secondSquare.classList.remove("whiteRook");
            secondSquare.classList.remove("whitePawn");
            secondSquare.classList.add("black");
            secondSquare.classList.add("blackPawn");
        }
        else
        {
            turnForWhite = !turnForWhite;
        }
    }

    function  blackRookMoveCheck(firstSquare, secondSquare, firstSquareId, secondSquareId){

        if(secondSquare.classList.contains("possible") && !secondSquare.classList.contains("whiteKing"))
        {
                firstSquare.classList.remove("black");
                firstSquare.classList.remove("blackRook");

                secondSquare.classList.remove("white");
                secondSquare.classList.remove("whiteKing");
                secondSquare.classList.remove("whiteQueen");
                secondSquare.classList.remove("whiteBishop");
                secondSquare.classList.remove("whiteKnight");
                secondSquare.classList.remove("whiteRook");
                secondSquare.classList.remove("whitePawn");

                secondSquare.classList.add("black");
                secondSquare.classList.add("blackRook");
        }
        else
        {
            turnForWhite = !turnForWhite;
        }
    }

    function blackBishopMoveCheck(firstSquare, secondSquare, firstSquareId, secondSquareId){
        if(secondSquare.classList.contains("possible") && !secondSquare.classList.contains("whiteKing"))
        {
                  //removing piece from first square
                  firstSquare.classList.remove("black");
                  firstSquare.classList.remove("blackBishop");
  
                  //removing opponent pieces from second square
                  secondSquare.classList.remove("white");
                  secondSquare.classList.remove("whiteKing");
                  secondSquare.classList.remove("whiteQueen");
                  secondSquare.classList.remove("whiteBishop");
                  secondSquare.classList.remove("whiteKnight");
                  secondSquare.classList.remove("whiteRook");
                  secondSquare.classList.remove("whitePawn");
                  //adding own pieces to second square
                  secondSquare.classList.add("black");
                  secondSquare.classList.add("blackBishop");
        }
        else
        {
            turnForWhite = !turnForWhite;
        }
    }

    function blackKnightMoveCheck(firstSquare, secondSquare, firstSquareId, secondSquareId){
        if(secondSquare.classList.contains("possible") && !secondSquare.classList.contains("whiteKing"))
        {
            firstSquare.classList.remove("black");
            firstSquare.classList.remove("blackKnight");

            secondSquare.classList.remove("white");
            secondSquare.classList.remove("whiteKing");
            secondSquare.classList.remove("whiteQueen");
            secondSquare.classList.remove("whiteBishop");
            secondSquare.classList.remove("whiteKnight");
            secondSquare.classList.remove("whiteRook");
            secondSquare.classList.remove("whitePawn");

            secondSquare.classList.add("black");
            secondSquare.classList.add("blackKnight");
        }
        else
        {
            turnForWhite = !turnForWhite;
        }
    }

    function  blackQueenMoveCheck(firstSquare, secondSquare, firstSquareId, secondSquareId){
        if(secondSquare.classList.contains("possible") && !secondSquare.classList.contains("whiteKing"))
        {
            //removing piece from first square
            firstSquare.classList.remove("black");
            firstSquare.classList.remove("blackQueen");

            //removing opponent pieces from second square
            secondSquare.classList.remove("white");
            secondSquare.classList.remove("whiteKing");
            secondSquare.classList.remove("whiteQueen");
            secondSquare.classList.remove("whiteBishop");
            secondSquare.classList.remove("whiteKnight");
            secondSquare.classList.remove("whiteRook");
            secondSquare.classList.remove("whitePawn");
            //adding own pieces to second square
            secondSquare.classList.add("black");
            secondSquare.classList.add("blackQueen");
        }
        else
        {
            turnForWhite = !turnForWhite;
        }
    }

    function blackKingMoveCheck(firstSquare, secondSquare, firstSquareId, secondSquareId){
        if(secondSquare.classList.contains("possible") && !secondSquare.classList.contains("whiteKing"))
        {
            firstSquare.classList.remove("black");
            firstSquare.classList.remove("blackKing");

            secondSquare.classList.remove("white");
            secondSquare.classList.remove("whiteKing");
            secondSquare.classList.remove("whiteQueen");
            secondSquare.classList.remove("whiteBishop");
            secondSquare.classList.remove("whiteKnight");
            secondSquare.classList.remove("whiteRook");
            secondSquare.classList.remove("whitePawn");

            secondSquare.classList.add("black");
            secondSquare.classList.add("blackKing");
        }
        else
        {
            turnForWhite = !turnForWhite;
        }
    }


    //checking kingcheck

    function checkKingCheckAfterRestriction(){
 
        if(document.querySelector(".blackKing").classList.contains("checkedByWhite"))
        {
            document.querySelector(".blackKing").classList.add("kingUnderCheck");
        }
        else if(document.querySelector(".whiteKing").classList.contains("checkedByBlack"))
        {
            document.querySelector(".whiteKing").classList.add("kingUnderCheck");
        }
    }

    function checkKingCheck(firstSquare, secondSquare){
 
            if(document.querySelector(".blackKing").classList.contains("checkedByWhite"))
            {
                document.querySelector(".blackKing").classList.add("kingUnderCheck");
            }
            else if(document.querySelector(".whiteKing").classList.contains("checkedByBlack"))
            {
                document.querySelector(".whiteKing").classList.add("kingUnderCheck");
            }

        if( turnForWhite && document.querySelector(".blackKing").classList.contains("kingUnderCheck"))
        {
            restrictBlackMoveUnderCheck(firstSquare, secondSquare);
        }

        if(!turnForWhite && document.querySelector(".whiteKing").classList.contains("kingUnderCheck"))
        {
            restrictWhiteMoveUnderCheck(firstSquare, secondSquare);
 
        }

    }

    //giving king check
    function giveKingCheck()
    {
        for(let i =0; i<=63; i++)
        {
            if(allSquares[i].classList.contains("whitePawn"))
            {
                checkedByWhitePawn(i);
            }

            if(allSquares[i].classList.contains("whiteRook"))
            {
                checkedByWhiteRook(i);
            }

            if(allSquares[i].classList.contains("blackPawn"))
            {
                checkedByBlackPawn(i);
            }

            if(allSquares[i].classList.contains("blackRook"))
            {
                checkedByBlackRook(i);
            }

            if(allSquares[i].classList.contains("whiteBishop"))
            {
                checkedByWhiteBishop(i);
            }

            if(allSquares[i].classList.contains("blackBishop"))
            {
                checkedByBlackBishop(i);
            }

            if(allSquares[i].classList.contains("whiteKnight"))
            {
                checkedByWhiteKnight(i);
            }

            if(allSquares[i].classList.contains("blackKnight"))
            {
                checkedByBlackKnight(i);
            }

            if(allSquares[i].classList.contains("whiteQueen"))
            {
                checkedByWhiteQueen(i);
            }

            if(allSquares[i].classList.contains("blackQueen"))
            {
                checkedByBlackQueen(i);
            }

            if(allSquares[i].classList.contains("whiteKing"))
            {
                checkedByWhiteKing(i);
            }

            if(allSquares[i].classList.contains("blackKing"))
            {
                checkedByBlackKing(i);
            }


        

        }
    }

    //all the i, index, firstSquareId refer to the index of the square below
    //checking check
    function checkedByWhitePawn(i){
        if( 
        (
          ( (i >= 48 && i <= 55) && (i-7 >= 40 && i-7 <= 47) ) ||
          ( (i >= 40 && i <= 47) && (i-7 >= 32 && i-7 <= 39) ) ||
          ( (i >= 32 && i <= 39) && (i-7 >= 24 && i-7 <= 31) ) ||
          ( (i >= 24 && i <= 31) && (i-7 >= 16 && i-7 <= 23) ) ||
          ( (i >= 16 && i <= 23) && (i-7 >= 8 && i-7 <= 15) ) ||
          ( (i >= 8 && i <= 15) && (i-7 >= 0 && i-7 <= 7) ) 
        )
    )
    {
        allSquares[i-7].classList.add("checkedByWhite");
    }

    if( 
    (
        ( (i >= 48 && i <= 55) && (i-9 >= 40 && i-9 <= 47) ) ||
        ( (i >= 40 && i <= 47) && (i-9 >= 32 && i-9 <= 39) ) ||
        ( (i >= 32 && i <= 39) && (i-9 >= 24 && i-9 <= 31) ) ||
        ( (i >= 24 && i <= 31) && (i-9 >= 16 && i-9 <= 23) ) ||
        ( (i >= 16 && i <= 23) && (i-9 >= 8 && i-9 <= 15) ) ||
        ( (i >= 8 && i <= 15) && (i-9 >= 0 && i-9 <= 7) ) 
      )
    )
    {
        allSquares[i-9].classList.add("checkedByWhite");
    }
    }

    function checkedByWhiteRook(index)
    {
        for(let i = 1; i<=7; i++)
        {
             if( index-i*8>=0 &&
                 ( allSquares[index-i*8].classList.contains("white") || allSquares[index-i*8].classList.contains("black") )
             )
             {
                 if(allSquares[index-i*8].classList.contains("black"))
                     allSquares[index-i*8].classList.add("checkedByWhite");
                 break;
             }
             else if(index-i*8>=0)
             {   
                 allSquares[index-i*8].classList.add("checkedByWhite");
             }
        }
 
        for(let i = 1; i<=7; i++)
        {
             if( index+i*8<=63 &&
                 ( allSquares[index+i*8].classList.contains("white") || allSquares[index+i*8].classList.contains("black") )
             )
             {
                 if(allSquares[index+i*8].classList.contains("black"))
                     allSquares[index+i*8].classList.add("checkedByWhite");
                 break;
             }
             else if(index+i*8<=63 )
             {
                 allSquares[index+i*8].classList.add("checkedByWhite");
             }
        }

        for(let i = 1; i<=7; i++)
        {
             if( 
                ( (index>=0 && index<=7) && (index+i<=7) &&
                 ( allSquares[index+i].classList.contains("white") || allSquares[index+i].classList.contains("black") ) )  ||
 
                 ( (index>=8 && index<=15) && (index+i<=15) &&
                 ( allSquares[index+i].classList.contains("white") || allSquares[index+i].classList.contains("black") ) ) ||
 
                 ( (index>=16 && index<=23) && (index+i<=23) &&
                 ( allSquares[index+i].classList.contains("white") || allSquares[index+i].classList.contains("black") ) ) ||
 
                 ( (index>=24 && index<=31) && (index+i<=31) &&
                 ( allSquares[index+i].classList.contains("white") || allSquares[index+i].classList.contains("black") ) ) ||
 
                 ( (index>=32 && index<=39) && (index+i<=39) &&
                 ( allSquares[index+i].classList.contains("white") || allSquares[index+i].classList.contains("black") ) ) ||
 
                 ( (index>=40 && index<=47) && (index+i<=47) &&
                 ( allSquares[index+i].classList.contains("white") || allSquares[index+i].classList.contains("black") ) ) ||
 
                 ( (index>=48 && index<=55) && (index+i<=55) &&
                 ( allSquares[index+i].classList.contains("white") || allSquares[index+i].classList.contains("black") ) ) ||
 
                 ( (index>=56 && index<=63) && (index+i<=63) &&
                 ( allSquares[index+i].classList.contains("white") || allSquares[index+i].classList.contains("black") ) ) 
             )
             {
                 if(allSquares[index+i].classList.contains("black"))
                     allSquares[index+i].classList.add("checkedByWhite");
                 break;
             }
             else if( 
                ( (index>=0 && index<=7) && (index+i<=7) ) || 
                ( (index>=8 && index<=15) && (index+i<=15) ) ||
                ( (index>=16 && index<=23) && (index+i<=23) ) ||
                ( (index>=24 && index<=31) && (index+i<=31) ) ||
                ( (index>=32 && index<=39) && (index+i<=39) ) ||
                ( (index>=40 && index<=47) && (index+i<=47) ) ||
                ( (index>=48 && index<=55) && (index+i<=55) ) ||
                ( (index>=56 && index<=63) && (index+i<=63) ) 
                 )
             {
                 allSquares[index+i].classList.add("checkedByWhite");
             }
        }
 
        for(let i = 1; i<=7; i++)
        {
             if( 
                ( (index>=0 && index<=7) && (index-i>=0) &&
                 ( allSquares[index-i].classList.contains("white") || allSquares[index-i].classList.contains("black") ) )  ||
 
                 ( (index>=8 && index<=15) && (index-i>=8) &&
                 ( allSquares[index-i].classList.contains("white") || allSquares[index-i].classList.contains("black") ) ) ||
 
                 ( (index>=16 && index<=23) && (index-i>=16) &&
                 ( allSquares[index-i].classList.contains("white") || allSquares[index-i].classList.contains("black") ) ) ||
 
                 ( (index>=24 && index<=31) && (index-i>=24) &&
                 ( allSquares[index-i].classList.contains("white") || allSquares[index-i].classList.contains("black") ) ) ||
 
                 ( (index>=32 && index<=39) && (index-i>=32) &&
                 ( allSquares[index-i].classList.contains("white") || allSquares[index-i].classList.contains("black") ) ) ||
 
                 ( (index>=40 && index<=47) && (index-i>=40) &&
                 ( allSquares[index-i].classList.contains("white") || allSquares[index-i].classList.contains("black") ) ) ||
 
                 ( (index>=48 && index<=55) && (index-i>=48) &&
                 ( allSquares[index-i].classList.contains("white") || allSquares[index-i].classList.contains("black") ) ) ||
 
                 ( (index>=56 && index<=63) && (index-i>=56) &&
                 ( allSquares[index-i].classList.contains("white") || allSquares[index-i].classList.contains("black") ) ) 
             )
             {
                 if(allSquares[index-i].classList.contains("black"))
                     allSquares[index-i].classList.add("checkedByWhite");
                 break;
             }
             else if( 
                ( (index>=0 && index<=7) &&(index-i>=0) ) || 
                ( (index>=8 && index<=15) && (index-i>=8) ) ||
                ( (index>=16 && index<=23) && (index-i>=16) ) ||
                ( (index>=24 && index<=31) && (index-i>=24) ) ||
                ( (index>=32 && index<=39) && (index-i>=32) ) ||
                ( (index>=40 && index<=47) && (index-i>=40) ) ||
                ( (index>=48 && index<=55) && (index-i>=48) ) ||
                ( (index>=56 && index<=63) && (index-i>=56) ) 
                 )
             {
                 allSquares[index-i].classList.add("checkedByWhite");
             }
        }
    }

    function  checkedByWhiteBishop(firstSquareId){
        for(let i = 1; i<=7; i++)
        {
             if( firstSquareId-i*7>=0 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId-i*7].style.backgroundColor) &&
                 ( allSquares[firstSquareId-i*7].classList.contains("white") || allSquares[firstSquareId-i*7].classList.contains("black") )
             )
             {
                 if(allSquares[firstSquareId-i*7].classList.contains("black"))
                     allSquares[firstSquareId-i*7].classList.add("checkedByWhite");
                 break;
             }
             else if(
                 firstSquareId-i*7>=0
                 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId-i*7].style.backgroundColor)
                 )
             {   
                 allSquares[firstSquareId-i*7].classList.add("checkedByWhite");
             }
        }

        for(let i = 1; i<=7; i++)
        {
             if( firstSquareId+i*7<=63 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId+i*7].style.backgroundColor) &&
                 ( allSquares[firstSquareId+i*7].classList.contains("white") || allSquares[firstSquareId+i*7].classList.contains("black") )
             )
             {
                 if(allSquares[firstSquareId+i*7].classList.contains("black"))
                     allSquares[firstSquareId+i*7].classList.add("checkedByWhite");
                 break;
             }
             else if(
                 firstSquareId+i*7<=63
                 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId+i*7].style.backgroundColor)
                 )
             {   
                 allSquares[firstSquareId+i*7].classList.add("checkedByWhite");
             }
        }

        for(let i = 1; i<=7; i++)
        {
             if( firstSquareId+i*9<=63 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId+i*9].style.backgroundColor) &&
                 ( allSquares[firstSquareId+i*9].classList.contains("white") || allSquares[firstSquareId+i*9].classList.contains("black") )
             )
             {
                 if(allSquares[firstSquareId+i*9].classList.contains("black"))
                     allSquares[firstSquareId+i*9].classList.add("checkedByWhite");
                 break;
             }
             else if(
                 firstSquareId+i*9<=63
                 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId+i*9].style.backgroundColor)
                 )
             {   
                 allSquares[firstSquareId+i*9].classList.add("checkedByWhite");
             }
        }

        for(let i = 1; i<=7; i++)
        {
             if( firstSquareId-i*9>=0 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId-i*9].style.backgroundColor) &&
                 ( allSquares[firstSquareId-i*9].classList.contains("white") || allSquares[firstSquareId-i*9].classList.contains("black") )
             )
             {
                 if(allSquares[firstSquareId-i*9].classList.contains("black"))
                     allSquares[firstSquareId-i*9].classList.add("checkedByWhite");
                 break;
             }
             else if(
                 firstSquareId-i*9>=0
                 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId-i*9].style.backgroundColor)
                 )
             {   
                 allSquares[firstSquareId-i*9].classList.add("checkedByWhite");
             }
        }
    }

    function checkedByWhiteKnight(firstSquareId){

        if(
            ( firstSquareId-15>=0 && firstSquareId-15<=63 ) &&
            (
                (firstSquareId >= 0 && firstSquareId <7) || (firstSquareId >= 8 && firstSquareId <15) || (firstSquareId >= 16 && firstSquareId <23) ||
                (firstSquareId >= 24 && firstSquareId <31) || (firstSquareId >= 32 && firstSquareId <39) ||(firstSquareId >= 40 && firstSquareId <47) || 
                (firstSquareId >= 48 && firstSquareId <55) || (firstSquareId >= 56 && firstSquareId <63)
            ) &&
            !allSquares[firstSquareId-15].classList.contains("white") 
        )
        {
            allSquares[firstSquareId-15].classList.add("checkedByWhite");
        }

        if(
            ( firstSquareId+15>=0 && firstSquareId+15<=63 ) &&
            (
                (firstSquareId > 0 && firstSquareId <=7) || (firstSquareId > 8 && firstSquareId <=15) || (firstSquareId > 16 && firstSquareId <=23) ||
                (firstSquareId > 24 && firstSquareId <=31) || (firstSquareId > 32 && firstSquareId <=39) ||(firstSquareId > 40 && firstSquareId <=47) || 
                (firstSquareId > 48 && firstSquareId <=55) || (firstSquareId > 56 && firstSquareId <=63)
            ) &&
            !allSquares[firstSquareId+15].classList.contains("white")
        )
        {
            allSquares[firstSquareId+15].classList.add("checkedByWhite");
        }

        if(
            ( firstSquareId-17>=0 && firstSquareId-17<=63 ) &&
            (
                (firstSquareId > 0 && firstSquareId <=7) || (firstSquareId > 8 && firstSquareId <=15) || (firstSquareId > 16 && firstSquareId <=23) ||
                (firstSquareId > 24 && firstSquareId <=31) || (firstSquareId > 32 && firstSquareId <=39) ||(firstSquareId > 40 && firstSquareId <=47) || 
                (firstSquareId > 48 && firstSquareId <=55) || (firstSquareId > 56 && firstSquareId <=63)
            ) &&
            !allSquares[firstSquareId-17].classList.contains("white")
            )
        {
            allSquares[firstSquareId-17].classList.add("checkedByWhite");
        }

        if(
            ( firstSquareId+17>=0 && firstSquareId+17<=63 ) &&
            (
                (firstSquareId >= 0 && firstSquareId <7) || (firstSquareId >= 8 && firstSquareId <15) || (firstSquareId >= 16 && firstSquareId <23) ||
                (firstSquareId >= 24 && firstSquareId <31) || (firstSquareId >= 32 && firstSquareId <39) ||(firstSquareId >= 40 && firstSquareId <47) || 
                (firstSquareId >= 48 && firstSquareId <55) || (firstSquareId >= 56 && firstSquareId <63)
            ) &&
            !allSquares[firstSquareId+17].classList.contains("white")
        )
        {
            allSquares[firstSquareId+17].classList.add("checkedByWhite");
        }

        if(
            ( firstSquareId+6>=0 && firstSquareId+6<=63 ) && 
            (
                (firstSquareId > 1 && firstSquareId <=7) || (firstSquareId > 9 && firstSquareId <=15) || (firstSquareId > 17 && firstSquareId <=23) ||
                (firstSquareId > 25 && firstSquareId <=31) || (firstSquareId > 33 && firstSquareId <=39) ||(firstSquareId > 41 && firstSquareId <=47) || 
                (firstSquareId > 49 && firstSquareId <=55) || (firstSquareId > 57 && firstSquareId <=63)
            ) &&
            !allSquares[firstSquareId+6].classList.contains("white")
        )
        {
            allSquares[firstSquareId+6].classList.add("checkedByWhite");
        }

        if(
            ( firstSquareId-6>=0 && firstSquareId-6<=63 ) && 
            (
                (firstSquareId >= 0 && firstSquareId <6) || (firstSquareId >= 8 && firstSquareId <14) || (firstSquareId >= 16 && firstSquareId <22) ||
                (firstSquareId >= 24 && firstSquareId <30) || (firstSquareId >= 32 && firstSquareId <38) ||(firstSquareId >= 40 && firstSquareId <46) || 
                (firstSquareId >= 48 && firstSquareId <54) || (firstSquareId >= 56 && firstSquareId <62)
            ) &&
            !allSquares[firstSquareId-6].classList.contains("white")
        )
        {
            allSquares[firstSquareId-6].classList.add("checkedByWhite");
        }

        if(
            ( firstSquareId-10>=0 && firstSquareId-10<=63 ) &&
            (
                (firstSquareId > 1 && firstSquareId <=7) || (firstSquareId > 9 && firstSquareId <=15) || (firstSquareId > 17 && firstSquareId <=23) ||
                (firstSquareId > 25 && firstSquareId <=31) || (firstSquareId > 33 && firstSquareId <=39) ||(firstSquareId > 41 && firstSquareId <=47) || 
                (firstSquareId > 49 && firstSquareId <=55) || (firstSquareId > 57 && firstSquareId <=63)
            ) &&
            !allSquares[firstSquareId-10].classList.contains("white")
        )
        {
            allSquares[firstSquareId-10].classList.add("checkedByWhite");
        }

        if(
            ( firstSquareId+10>=0 && firstSquareId+10<=63 ) &&
            (
                (firstSquareId >= 0 && firstSquareId <6) || (firstSquareId >= 8 && firstSquareId <14) || (firstSquareId >= 16 && firstSquareId <22) ||
                (firstSquareId >= 24 && firstSquareId <30) || (firstSquareId >= 32 && firstSquareId <38) ||(firstSquareId >= 40 && firstSquareId <46) || 
                (firstSquareId >= 48 && firstSquareId <54) || (firstSquareId >= 56 && firstSquareId <62)
            ) &&
            !allSquares[firstSquareId+10].classList.contains("white")
        )
        {
            allSquares[firstSquareId+10].classList.add("checkedByWhite");
        }

    }

    function checkedByWhiteQueen(firstSquareId){
        for(let i = 1; i<=7; i++)
        {
             if( firstSquareId-i*8>=0 &&
                 ( allSquares[firstSquareId-i*8].classList.contains("white") || allSquares[firstSquareId-i*8].classList.contains("black") )
             )
             {
                 if(allSquares[firstSquareId-i*8].classList.contains("black"))
                     allSquares[firstSquareId-i*8].classList.add("checkedByWhite");
                 break;
             }
             else if(firstSquareId-i*8>=0)
             {   
                 allSquares[firstSquareId-i*8].classList.add("checkedByWhite");
             }
        }
 
        for(let i = 1; i<=7; i++)
        {
             if( firstSquareId+i*8<=63 &&
                 ( allSquares[firstSquareId+i*8].classList.contains("white") || allSquares[firstSquareId+i*8].classList.contains("black") )
             )
             {
                 if(allSquares[firstSquareId+i*8].classList.contains("black"))
                     allSquares[firstSquareId+i*8].classList.add("checkedByWhite");
                 break;
             }
             else if(firstSquareId+i*8<=63 )
             {
                 allSquares[firstSquareId+i*8].classList.add("checkedByWhite");
             }
        }
 
        for(let i = 1; i<=7; i++)
        {
             if( 
                ( (firstSquareId>=0 && firstSquareId<=7) && (firstSquareId+i<=7) &&
                 ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) )  ||
 
                 ( (firstSquareId>=8 && firstSquareId<=15) && (firstSquareId+i<=15) &&
                 ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=16 && firstSquareId<=23) && (firstSquareId+i<=23) &&
                 ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=24 && firstSquareId<=31) && (firstSquareId+i<=31) &&
                 ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=32 && firstSquareId<=39) && (firstSquareId+i<=39) &&
                 ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=40 && firstSquareId<=47) && (firstSquareId+i<=47) &&
                 ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=48 && firstSquareId<=55) && (firstSquareId+i<=55) &&
                 ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=56 && firstSquareId<=63) && (firstSquareId+i<=63) &&
                 ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) ) 
             )
             {
                 if(allSquares[firstSquareId+i].classList.contains("black"))
                     allSquares[firstSquareId+i].classList.add("checkedByWhite");
                 break;
             }
             else if( 
                ( (firstSquareId>=0 && firstSquareId<=7) && (firstSquareId+i<=7) ) || 
                ( (firstSquareId>=8 && firstSquareId<=15) && (firstSquareId+i<=15) ) ||
                ( (firstSquareId>=16 && firstSquareId<=23) && (firstSquareId+i<=23) ) ||
                ( (firstSquareId>=24 && firstSquareId<=31) && (firstSquareId+i<=31) ) ||
                ( (firstSquareId>=32 && firstSquareId<=39) && (firstSquareId+i<=39) ) ||
                ( (firstSquareId>=40 && firstSquareId<=47) && (firstSquareId+i<=47) ) ||
                ( (firstSquareId>=48 && firstSquareId<=55) && (firstSquareId+i<=55) ) ||
                ( (firstSquareId>=56 && firstSquareId<=63) && (firstSquareId+i<=63) ) 
                 )
             {
                 allSquares[firstSquareId+i].classList.add("checkedByWhite");
             }
        }
 
        for(let i = 1; i<=7; i++)
        {
             if( 
                ( (firstSquareId>=0 && firstSquareId<=7) && (firstSquareId-i>=0) &&
                 ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) )  ||
 
                 ( (firstSquareId>=8 && firstSquareId<=15) && (firstSquareId-i>=8) &&
                 ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=16 && firstSquareId<=23) && (firstSquareId-i>=16) &&
                 ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=24 && firstSquareId<=31) && (firstSquareId-i>=24) &&
                 ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=32 && firstSquareId<=39) && (firstSquareId-i>=32) &&
                 ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=40 && firstSquareId<=47) && (firstSquareId-i>=40) &&
                 ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=48 && firstSquareId<=55) && (firstSquareId-i>=48) &&
                 ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=56 && firstSquareId<=63) && (firstSquareId-i>=56) &&
                 ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) ) 
             )
             {
                 if(allSquares[firstSquareId-i].classList.contains("black"))
                     allSquares[firstSquareId-i].classList.add("checkedByWhite");
                 break;
             }
             else if( 
                ( (firstSquareId>=0 && firstSquareId<=7) &&(firstSquareId-i>=0) ) || 
                ( (firstSquareId>=8 && firstSquareId<=15) && (firstSquareId-i>=8) ) ||
                ( (firstSquareId>=16 && firstSquareId<=23) && (firstSquareId-i>=16) ) ||
                ( (firstSquareId>=24 && firstSquareId<=31) && (firstSquareId-i>=24) ) ||
                ( (firstSquareId>=32 && firstSquareId<=39) && (firstSquareId-i>=32) ) ||
                ( (firstSquareId>=40 && firstSquareId<=47) && (firstSquareId-i>=40) ) ||
                ( (firstSquareId>=48 && firstSquareId<=55) && (firstSquareId-i>=48) ) ||
                ( (firstSquareId>=56 && firstSquareId<=63) && (firstSquareId-i>=56) ) 
                 )
             {
                 allSquares[firstSquareId-i].classList.add("checkedByWhite");
             }
        }

        //bishop part
        for(let i = 1; i<=7; i++)
        {
             if( firstSquareId-i*7>=0 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId-i*7].style.backgroundColor) &&
                 ( allSquares[firstSquareId-i*7].classList.contains("white") || allSquares[firstSquareId-i*7].classList.contains("black") )
             )
             {
                 if(allSquares[firstSquareId-i*7].classList.contains("black"))
                     allSquares[firstSquareId-i*7].classList.add("checkedByWhite");
                 break;
             }
             else if(
                 firstSquareId-i*7>=0
                 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId-i*7].style.backgroundColor)
                 )
             {   
                 allSquares[firstSquareId-i*7].classList.add("checkedByWhite");
             }
        }

        for(let i = 1; i<=7; i++)
        {
             if( firstSquareId+i*7<=63 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId+i*7].style.backgroundColor) &&
                 ( allSquares[firstSquareId+i*7].classList.contains("white") || allSquares[firstSquareId+i*7].classList.contains("black") )
             )
             {
                 if(allSquares[firstSquareId+i*7].classList.contains("black"))
                     allSquares[firstSquareId+i*7].classList.add("checkedByWhite");
                 break;
             }
             else if(
                 firstSquareId+i*7<=63
                 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId+i*7].style.backgroundColor)
                 )
             {   
                 allSquares[firstSquareId+i*7].classList.add("checkedByWhite");
             }
        }

        for(let i = 1; i<=7; i++)
        {
             if( firstSquareId+i*9<=63 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId+i*9].style.backgroundColor) &&
                 ( allSquares[firstSquareId+i*9].classList.contains("white") || allSquares[firstSquareId+i*9].classList.contains("black") )
             )
             {
                 if(allSquares[firstSquareId+i*9].classList.contains("black"))
                     allSquares[firstSquareId+i*9].classList.add("checkedByWhite");
                 break;
             }
             else if(
                 firstSquareId+i*9<=63
                 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId+i*9].style.backgroundColor)
                 )
             {   
                 allSquares[firstSquareId+i*9].classList.add("checkedByWhite");
             }
        }

        for(let i = 1; i<=7; i++)
        {
             if( firstSquareId-i*9>=0 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId-i*9].style.backgroundColor) &&
                 ( allSquares[firstSquareId-i*9].classList.contains("white") || allSquares[firstSquareId-i*9].classList.contains("black") )
             )
             {
                 if(allSquares[firstSquareId-i*9].classList.contains("black"))
                     allSquares[firstSquareId-i*9].classList.add("checkedByWhite");
                 break;
             }
             else if(
                 firstSquareId-i*9>=0
                 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId-i*9].style.backgroundColor)
                 )
             {   
                 allSquares[firstSquareId-i*9].classList.add("checkedByWhite");
             }
        }
    }

    function checkedByWhiteKing(firstSquareId){
        if(
            firstSquareId+8 <= 63 && !allSquares[firstSquareId+8].classList.contains("white") 
         )
         {
            allSquares[firstSquareId+8].classList.add("checkedByWhite");
         }
 
         if(
            firstSquareId-8 >= 0 && !allSquares[firstSquareId-8].classList.contains("white") 
         )
         {
            allSquares[firstSquareId-8].classList.add("checkedByWhite");
         }
 
         if(
            firstSquareId-1 >= 0 && 
            (
                (firstSquareId > 0 &&firstSquareId <= 7) || (firstSquareId > 8 &&firstSquareId <= 15) || (firstSquareId > 16 &&firstSquareId <= 23) ||
                (firstSquareId > 24 &&firstSquareId <= 31) || (firstSquareId > 32 &&firstSquareId <= 39) || (firstSquareId > 40 &&firstSquareId <= 47) ||
                (firstSquareId > 48 &&firstSquareId <= 55) || (firstSquareId > 56 &&firstSquareId <= 63) 
            ) && 
            !allSquares[firstSquareId-1].classList.contains("white")
         )
         {
            allSquares[firstSquareId-1].classList.add("checkedByWhite");
         }
 
         if(
            firstSquareId-9 >= 0 && 
            (
                (firstSquareId > 0 &&firstSquareId <= 7) || (firstSquareId > 8 &&firstSquareId <= 15) || (firstSquareId > 16 &&firstSquareId <= 23) ||
                (firstSquareId > 24 &&firstSquareId <= 31) || (firstSquareId > 32 &&firstSquareId <= 39) || (firstSquareId > 40 &&firstSquareId <= 47) ||
                (firstSquareId > 48 &&firstSquareId <= 55) || (firstSquareId > 56 &&firstSquareId <= 63) 
            ) && 
            !allSquares[firstSquareId-9].classList.contains("white") 
         )
         {
            allSquares[firstSquareId-9].classList.add("checkedByWhite");
         }
 
         if(
            firstSquareId+7 <=63 && 
            (
                (firstSquareId > 0 &&firstSquareId <= 7) || (firstSquareId > 8 &&firstSquareId <= 15) || (firstSquareId > 16 &&firstSquareId <= 23) ||
                (firstSquareId > 24 &&firstSquareId <= 31) || (firstSquareId > 32 &&firstSquareId <= 39) || (firstSquareId > 40 &&firstSquareId <= 47) ||
                (firstSquareId > 48 &&firstSquareId <= 55) || (firstSquareId > 56 &&firstSquareId <= 63) 
            ) && 
            !allSquares[firstSquareId+7].classList.contains("white") 
         )
         {
            allSquares[firstSquareId+7].classList.add("checkedByWhite");
         }
 
         if(
            firstSquareId + 1 <= 63 &&
            (
                (firstSquareId >= 0 &&firstSquareId < 7) || (firstSquareId >= 8 &&firstSquareId < 15) || (firstSquareId >= 16 &&firstSquareId < 23) ||
                (firstSquareId >= 24 &&firstSquareId < 31) || (firstSquareId >= 32 &&firstSquareId < 39) || (firstSquareId >= 40 &&firstSquareId < 47) ||
                (firstSquareId >= 48 &&firstSquareId < 55) || (firstSquareId >= 56 &&firstSquareId < 63) 
            ) && 
            !allSquares[firstSquareId+1].classList.contains("white")
         )
         {
            allSquares[firstSquareId+1].classList.add("checkedByWhite");
         }
 
         if(
            firstSquareId + 9 <= 63 &&
            (
                (firstSquareId >= 0 &&firstSquareId < 7) || (firstSquareId >= 8 &&firstSquareId < 15) || (firstSquareId >= 16 &&firstSquareId < 23) ||
                (firstSquareId >= 24 &&firstSquareId < 31) || (firstSquareId >= 32 &&firstSquareId < 39) || (firstSquareId >= 40 &&firstSquareId < 47) ||
                (firstSquareId >= 48 &&firstSquareId < 55) || (firstSquareId >= 56 &&firstSquareId < 63) 
            ) && 
            !allSquares[firstSquareId+9].classList.contains("white")
         )
         {
            allSquares[firstSquareId+9].classList.add("checkedByWhite");
         }
 
         if(
            firstSquareId - 7 >= 0 &&
            (
                (firstSquareId >= 0 &&firstSquareId < 7) || (firstSquareId >= 8 &&firstSquareId < 15) || (firstSquareId >= 16 &&firstSquareId < 23) ||
                (firstSquareId >= 24 &&firstSquareId < 31) || (firstSquareId >= 32 &&firstSquareId < 39) || (firstSquareId >= 40 &&firstSquareId < 47) ||
                (firstSquareId >= 48 &&firstSquareId < 55) || (firstSquareId >= 56 &&firstSquareId < 63) 
            ) && 
            !allSquares[firstSquareId-7].classList.contains("white")
         )
         {
            allSquares[firstSquareId-7].classList.add("checkedByWhite");
         }
    }

    //black

    function checkedByBlackPawn(i){
        if( 
                  (
          ( (i >= 48 && i <= 55) && (i+7 >= 56 && i+7 <= 63) ) ||
          ( (i >= 40 && i <= 47) && (i+7 >= 48 && i+7 <= 55) ) ||
          ( (i >= 32 && i <= 39) && (i+7 >= 40 && i+7 <= 47) ) ||
          ( (i >= 24 && i <= 31) && (i+7 >= 32 && i+7 <= 39) ) ||
          ( (i >= 16 && i <= 23) && (i+7 >= 24 && i+7 <= 31) ) ||
          ( (i >= 8 && i <= 15) && (i+7 >= 16 && i+7 <= 23) ) 
        )

        )
        {
            allSquares[i+7].classList.add("checkedByBlack");
        }
    
        if( 
        (
            ( (i >= 48 && i <= 55) && (i+9 >= 56 && i+9 <= 63) ) ||
            ( (i >= 40 && i <= 47) && (i+9 >= 48 && i+9 <= 55) ) ||
            ( (i >= 32 && i <= 39) && (i+9 >= 40 && i+9 <= 47) ) ||
            ( (i >= 24 && i <= 31) && (i+9 >= 32 && i+9 <= 39) ) ||
            ( (i >= 16 && i <= 23) && (i+9 >= 24 && i+9 <= 31) ) ||
            ( (i >= 8 && i <= 15) && (i+9 >= 16 && i+9 <= 23) ) 
          )
        )
        {
            allSquares[i+9].classList.add("checkedByBlack");
        }
    }

    function  checkedByBlackRook(index){
        for(let i = 1; i<=7; i++)
        {
             if( index-i*8>=0 &&
                 ( allSquares[index-i*8].classList.contains("white") || allSquares[index-i*8].classList.contains("black") )
             )
             {
                 if(allSquares[index-i*8].classList.contains("white"))
                     allSquares[index-i*8].classList.add("checkedByBlack");
                 break;
             }
             else if(index-i*8>=0)
             {   
                 allSquares[index-i*8].classList.add("checkedByBlack");
             }
        }
 
        for(let i = 1; i<=7; i++)
        {
             if( index+i*8<=63 &&
                 ( allSquares[index+i*8].classList.contains("white") || allSquares[index+i*8].classList.contains("black") )
             )
             {
                 if(allSquares[index+i*8].classList.contains("white"))
                     allSquares[index+i*8].classList.add("checkedByBlack");
                 break;
             }
             else if(index+i*8<=63 )
             {
                 allSquares[index+i*8].classList.add("checkedByBlack");
             }
        }

        for(let i = 1; i<=7; i++)
        {
             if( 
                ( (index>=0 && index<=7) && (index+i<=7) &&
                 ( allSquares[index+i].classList.contains("white") || allSquares[index+i].classList.contains("black") ) )  ||
 
                 ( (index>=8 && index<=15) && (index+i<=15) &&
                 ( allSquares[index+i].classList.contains("white") || allSquares[index+i].classList.contains("black") ) ) ||
 
                 ( (index>=16 && index<=23) && (index+i<=23) &&
                 ( allSquares[index+i].classList.contains("white") || allSquares[index+i].classList.contains("black") ) ) ||
 
                 ( (index>=24 && index<=31) && (index+i<=31) &&
                 ( allSquares[index+i].classList.contains("white") || allSquares[index+i].classList.contains("black") ) ) ||
 
                 ( (index>=32 && index<=39) && (index+i<=39) &&
                 ( allSquares[index+i].classList.contains("white") || allSquares[index+i].classList.contains("black") ) ) ||
 
                 ( (index>=40 && index<=47) && (index+i<=47) &&
                 ( allSquares[index+i].classList.contains("white") || allSquares[index+i].classList.contains("black") ) ) ||
 
                 ( (index>=48 && index<=55) && (index+i<=55) &&
                 ( allSquares[index+i].classList.contains("white") || allSquares[index+i].classList.contains("black") ) ) ||
 
                 ( (index>=56 && index<=63) && (index+i<=63) &&
                 ( allSquares[index+i].classList.contains("white") || allSquares[index+i].classList.contains("black") ) ) 
             )
             {
                 if(allSquares[index+i].classList.contains("white"))
                     allSquares[index+i].classList.add("checkedByBlack");
                 break;
             }
             else if( 
                ( (index>=0 && index<=7) && (index+i<=7) ) || 
                ( (index>=8 && index<=15) && (index+i<=15) ) ||
                ( (index>=16 && index<=23) && (index+i<=23) ) ||
                ( (index>=24 && index<=31) && (index+i<=31) ) ||
                ( (index>=32 && index<=39) && (index+i<=39) ) ||
                ( (index>=40 && index<=47) && (index+i<=47) ) ||
                ( (index>=48 && index<=55) && (index+i<=55) ) ||
                ( (index>=56 && index<=63) && (index+i<=63) ) 
                 )
             {
                 allSquares[index+i].classList.add("checkedByBlack");
             }
        }
 
        for(let i = 1; i<=7; i++)
        {
             if( 
                ( (index>=0 && index<=7) && (index-i>=0) &&
                 ( allSquares[index-i].classList.contains("white") || allSquares[index-i].classList.contains("black") ) )  ||
 
                 ( (index>=8 && index<=15) && (index-i>=8) &&
                 ( allSquares[index-i].classList.contains("white") || allSquares[index-i].classList.contains("black") ) ) ||
 
                 ( (index>=16 && index<=23) && (index-i>=16) &&
                 ( allSquares[index-i].classList.contains("white") || allSquares[index-i].classList.contains("black") ) ) ||
 
                 ( (index>=24 && index<=31) && (index-i>=24) &&
                 ( allSquares[index-i].classList.contains("white") || allSquares[index-i].classList.contains("black") ) ) ||
 
                 ( (index>=32 && index<=39) && (index-i>=32) &&
                 ( allSquares[index-i].classList.contains("white") || allSquares[index-i].classList.contains("black") ) ) ||
 
                 ( (index>=40 && index<=47) && (index-i>=40) &&
                 ( allSquares[index-i].classList.contains("white") || allSquares[index-i].classList.contains("black") ) ) ||
 
                 ( (index>=48 && index<=55) && (index-i>=48) &&
                 ( allSquares[index-i].classList.contains("white") || allSquares[index-i].classList.contains("black") ) ) ||
 
                 ( (index>=56 && index<=63) && (index-i>=56) &&
                 ( allSquares[index-i].classList.contains("white") || allSquares[index-i].classList.contains("black") ) ) 
             )
             {
                 if(allSquares[index-i].classList.contains("white"))
                     allSquares[index-i].classList.add("checkedByBlack");
                 break;
             }
             else if( 
                ( (index>=0 && index<=7) &&(index-i>=0) ) || 
                ( (index>=8 && index<=15) && (index-i>=8) ) ||
                ( (index>=16 && index<=23) && (index-i>=16) ) ||
                ( (index>=24 && index<=31) && (index-i>=24) ) ||
                ( (index>=32 && index<=39) && (index-i>=32) ) ||
                ( (index>=40 && index<=47) && (index-i>=40) ) ||
                ( (index>=48 && index<=55) && (index-i>=48) ) ||
                ( (index>=56 && index<=63) && (index-i>=56) ) 
                 )
             {
                 allSquares[index-i].classList.add("checkedByBlack");
             }
        }
    }

    function  checkedByBlackBishop(firstSquareId){
        for(let i = 1; i<=7; i++)
        {
             if( firstSquareId-i*7>=0 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId-i*7].style.backgroundColor) &&
                 ( allSquares[firstSquareId-i*7].classList.contains("white") || allSquares[firstSquareId-i*7].classList.contains("black") )
             )
             {
                 if(allSquares[firstSquareId-i*7].classList.contains("white"))
                     allSquares[firstSquareId-i*7].classList.add("checkedByBlack");
                 break;
             }
             else if(
                 firstSquareId-i*7>=0
                 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId-i*7].style.backgroundColor)
                 )
             {   
                 allSquares[firstSquareId-i*7].classList.add("checkedByBlack");
             }
        }

        for(let i = 1; i<=7; i++)
        {
             if( firstSquareId+i*7<=63 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId+i*7].style.backgroundColor) &&
                 ( allSquares[firstSquareId+i*7].classList.contains("white") || allSquares[firstSquareId+i*7].classList.contains("black") )
             )
             {
                 if(allSquares[firstSquareId+i*7].classList.contains("white"))
                     allSquares[firstSquareId+i*7].classList.add("checkedByBlack");
                 break;
             }
             else if(
                 firstSquareId+i*7<=63
                 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId+i*7].style.backgroundColor)
                 )
             {   
                 allSquares[firstSquareId+i*7].classList.add("checkedByBlack");
             }
        }

        for(let i = 1; i<=7; i++)
        {
             if( firstSquareId+i*9<=63 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId+i*9].style.backgroundColor) &&
                 ( allSquares[firstSquareId+i*9].classList.contains("white") || allSquares[firstSquareId+i*9].classList.contains("black") )
             )
             {
                 if(allSquares[firstSquareId+i*9].classList.contains("white"))
                     allSquares[firstSquareId+i*9].classList.add("checkedByBlack");
                 break;
             }
             else if(
                 firstSquareId+i*9<=63
                 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId+i*9].style.backgroundColor)
                 )
             {   
                 allSquares[firstSquareId+i*9].classList.add("checkedByBlack");
             }
        }

        for(let i = 1; i<=7; i++)
        {
             if( firstSquareId-i*9>=0 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId-i*9].style.backgroundColor) &&
                 ( allSquares[firstSquareId-i*9].classList.contains("white") || allSquares[firstSquareId-i*9].classList.contains("black") )
             )
             {
                 if(allSquares[firstSquareId-i*9].classList.contains("white"))
                     allSquares[firstSquareId-i*9].classList.add("checkedByBlack");
                 break;
             }
             else if(
                 firstSquareId-i*9>=0
                 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId-i*9].style.backgroundColor)
                 )
             {   
                 allSquares[firstSquareId-i*9].classList.add("checkedByBlack");
             }
        }
    }

    function checkedByBlackKnight(firstSquareId){
        if(
            ( firstSquareId-15>=0 && firstSquareId-15<=63 ) &&
            (
                (firstSquareId >= 0 && firstSquareId <7) || (firstSquareId >= 8 && firstSquareId <15) || (firstSquareId >= 16 && firstSquareId <23) ||
                (firstSquareId >= 24 && firstSquareId <31) || (firstSquareId >= 32 && firstSquareId <39) ||(firstSquareId >= 40 && firstSquareId <47) || 
                (firstSquareId >= 48 && firstSquareId <55) || (firstSquareId >= 56 && firstSquareId <63)
            ) &&
            !allSquares[firstSquareId-15].classList.contains("black") 
        )
        {
            allSquares[firstSquareId-15].classList.add("checkedByBlack");
        }

        if(
            ( firstSquareId+15>=0 && firstSquareId+15<=63 ) &&
            (
                (firstSquareId > 0 && firstSquareId <=7) || (firstSquareId > 8 && firstSquareId <=15) || (firstSquareId > 16 && firstSquareId <=23) ||
                (firstSquareId > 24 && firstSquareId <=31) || (firstSquareId > 32 && firstSquareId <=39) ||(firstSquareId > 40 && firstSquareId <=47) || 
                (firstSquareId > 48 && firstSquareId <=55) || (firstSquareId > 56 && firstSquareId <=63)
            ) &&
            !allSquares[firstSquareId+15].classList.contains("black")
        )
        {
            allSquares[firstSquareId+15].classList.add("checkedByBlack");
        }

        if(
            ( firstSquareId-17>=0 && firstSquareId-17<=63 ) &&
            (
                (firstSquareId > 0 && firstSquareId <=7) || (firstSquareId > 8 && firstSquareId <=15) || (firstSquareId > 16 && firstSquareId <=23) ||
                (firstSquareId > 24 && firstSquareId <=31) || (firstSquareId > 32 && firstSquareId <=39) ||(firstSquareId > 40 && firstSquareId <=47) || 
                (firstSquareId > 48 && firstSquareId <=55) || (firstSquareId > 56 && firstSquareId <=63)
            ) &&
            !allSquares[firstSquareId-17].classList.contains("black")
            )
        {
            allSquares[firstSquareId-17].classList.add("checkedByBlack");
        }

        if(
            ( firstSquareId+17>=0 && firstSquareId+17<=63 ) &&
            (
                (firstSquareId >= 0 && firstSquareId <7) || (firstSquareId >= 8 && firstSquareId <15) || (firstSquareId >= 16 && firstSquareId <23) ||
                (firstSquareId >= 24 && firstSquareId <31) || (firstSquareId >= 32 && firstSquareId <39) ||(firstSquareId >= 40 && firstSquareId <47) || 
                (firstSquareId >= 48 && firstSquareId <55) || (firstSquareId >= 56 && firstSquareId <63)
            ) &&
            !allSquares[firstSquareId+17].classList.contains("black")
        )
        {
            allSquares[firstSquareId+17].classList.add("checkedByBlack");
        }

        if(
            ( firstSquareId+6>=0 && firstSquareId+6<=63 ) && 
            (
                (firstSquareId > 1 && firstSquareId <=7) || (firstSquareId > 9 && firstSquareId <=15) || (firstSquareId > 17 && firstSquareId <=23) ||
                (firstSquareId > 25 && firstSquareId <=31) || (firstSquareId > 33 && firstSquareId <=39) ||(firstSquareId > 41 && firstSquareId <=47) || 
                (firstSquareId > 49 && firstSquareId <=55) || (firstSquareId > 57 && firstSquareId <=63)
            ) &&
            !allSquares[firstSquareId+6].classList.contains("black")
        )
        {
            allSquares[firstSquareId+6].classList.add("checkedByBlack");
        }

        if(
            ( firstSquareId-6>=0 && firstSquareId-6<=63 ) && 
            (
                (firstSquareId >= 0 && firstSquareId <6) || (firstSquareId >= 8 && firstSquareId <14) || (firstSquareId >= 16 && firstSquareId <22) ||
                (firstSquareId >= 24 && firstSquareId <30) || (firstSquareId >= 32 && firstSquareId <38) ||(firstSquareId >= 40 && firstSquareId <46) || 
                (firstSquareId >= 48 && firstSquareId <54) || (firstSquareId >= 56 && firstSquareId <62)
            ) &&
            !allSquares[firstSquareId-6].classList.contains("black")
        )
        {
            allSquares[firstSquareId-6].classList.add("checkedByBlack");
        }

        if(
            ( firstSquareId-10>=0 && firstSquareId-10<=63 ) &&
            (
                (firstSquareId > 1 && firstSquareId <=7) || (firstSquareId > 9 && firstSquareId <=15) || (firstSquareId > 17 && firstSquareId <=23) ||
                (firstSquareId > 25 && firstSquareId <=31) || (firstSquareId > 33 && firstSquareId <=39) ||(firstSquareId > 41 && firstSquareId <=47) || 
                (firstSquareId > 49 && firstSquareId <=55) || (firstSquareId > 57 && firstSquareId <=63)
            ) &&
            !allSquares[firstSquareId-10].classList.contains("black")
        )
        {
            allSquares[firstSquareId-10].classList.add("checkedByBlack");
        }

        if(
            ( firstSquareId+10>=0 && firstSquareId+10<=63 ) &&
            (
                (firstSquareId >= 0 && firstSquareId <6) || (firstSquareId >= 8 && firstSquareId <14) || (firstSquareId >= 16 && firstSquareId <22) ||
                (firstSquareId >= 24 && firstSquareId <30) || (firstSquareId >= 32 && firstSquareId <38) ||(firstSquareId >= 40 && firstSquareId <46) || 
                (firstSquareId >= 48 && firstSquareId <54) || (firstSquareId >= 56 && firstSquareId <62)
            ) &&
            !allSquares[firstSquareId+10].classList.contains("black")
        )
        {
            allSquares[firstSquareId+10].classList.add("checkedByBlack");
        }
    }

    function checkedByBlackQueen(firstSquareId){
        //rook part
        for(let i = 1; i<=7; i++)
        {
             if( firstSquareId-i*8>=0 &&
                 ( allSquares[firstSquareId-i*8].classList.contains("white") || allSquares[firstSquareId-i*8].classList.contains("black") )
             )
             {
                 if(allSquares[firstSquareId-i*8].classList.contains("white"))
                     allSquares[firstSquareId-i*8].classList.add("checkedByBlack");
                 break;
             }
             else if(firstSquareId-i*8>=0)
             {   
                 allSquares[firstSquareId-i*8].classList.add("checkedByBlack");
             }
        }
 
        for(let i = 1; i<=7; i++)
        {
             if( firstSquareId+i*8<=63 &&
                 ( allSquares[firstSquareId+i*8].classList.contains("white") || allSquares[firstSquareId+i*8].classList.contains("black") )
             )
             {
                 if(allSquares[firstSquareId+i*8].classList.contains("white"))
                     allSquares[firstSquareId+i*8].classList.add("checkedByBlack");
                 break;
             }
             else if(firstSquareId+i*8<=63 )
             {
                 allSquares[firstSquareId+i*8].classList.add("checkedByBlack");
             }
        }
 
        for(let i = 1; i<=7; i++)
        {
             if( 
                ( (firstSquareId>=0 && firstSquareId<=7) && (firstSquareId+i<=7) &&
                 ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) )  ||
 
                 ( (firstSquareId>=8 && firstSquareId<=15) && (firstSquareId+i<=15) &&
                 ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=16 && firstSquareId<=23) && (firstSquareId+i<=23) &&
                 ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=24 && firstSquareId<=31) && (firstSquareId+i<=31) &&
                 ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=32 && firstSquareId<=39) && (firstSquareId+i<=39) &&
                 ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=40 && firstSquareId<=47) && (firstSquareId+i<=47) &&
                 ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=48 && firstSquareId<=55) && (firstSquareId+i<=55) &&
                 ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=56 && firstSquareId<=63) && (firstSquareId+i<=63) &&
                 ( allSquares[firstSquareId+i].classList.contains("white") || allSquares[firstSquareId+i].classList.contains("black") ) ) 
             )
             {
                 if(allSquares[firstSquareId+i].classList.contains("white"))
                     allSquares[firstSquareId+i].classList.add("checkedByBlack");
                 break;
             }
             else if( 
                ( (firstSquareId>=0 && firstSquareId<=7) && (firstSquareId+i<=7) ) || 
                ( (firstSquareId>=8 && firstSquareId<=15) && (firstSquareId+i<=15) ) ||
                ( (firstSquareId>=16 && firstSquareId<=23) && (firstSquareId+i<=23) ) ||
                ( (firstSquareId>=24 && firstSquareId<=31) && (firstSquareId+i<=31) ) ||
                ( (firstSquareId>=32 && firstSquareId<=39) && (firstSquareId+i<=39) ) ||
                ( (firstSquareId>=40 && firstSquareId<=47) && (firstSquareId+i<=47) ) ||
                ( (firstSquareId>=48 && firstSquareId<=55) && (firstSquareId+i<=55) ) ||
                ( (firstSquareId>=56 && firstSquareId<=63) && (firstSquareId+i<=63) ) 
                 )
             {
                 allSquares[firstSquareId+i].classList.add("checkedByBlack");
             }
        }
 
        for(let i = 1; i<=7; i++)
        {
             if( 
                ( (firstSquareId>=0 && firstSquareId<=7) && (firstSquareId-i>=0) &&
                 ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) )  ||
 
                 ( (firstSquareId>=8 && firstSquareId<=15) && (firstSquareId-i>=8) &&
                 ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=16 && firstSquareId<=23) && (firstSquareId-i>=16) &&
                 ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=24 && firstSquareId<=31) && (firstSquareId-i>=24) &&
                 ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=32 && firstSquareId<=39) && (firstSquareId-i>=32) &&
                 ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=40 && firstSquareId<=47) && (firstSquareId-i>=40) &&
                 ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=48 && firstSquareId<=55) && (firstSquareId-i>=48) &&
                 ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) ) ||
 
                 ( (firstSquareId>=56 && firstSquareId<=63) && (firstSquareId-i>=56) &&
                 ( allSquares[firstSquareId-i].classList.contains("white") || allSquares[firstSquareId-i].classList.contains("black") ) ) 
             )
             {
                 if(allSquares[firstSquareId-i].classList.contains("white"))
                     allSquares[firstSquareId-i].classList.add("checkedByBlack");
                 break;
             }
             else if( 
                ( (firstSquareId>=0 && firstSquareId<=7) &&(firstSquareId-i>=0) ) || 
                ( (firstSquareId>=8 && firstSquareId<=15) && (firstSquareId-i>=8) ) ||
                ( (firstSquareId>=16 && firstSquareId<=23) && (firstSquareId-i>=16) ) ||
                ( (firstSquareId>=24 && firstSquareId<=31) && (firstSquareId-i>=24) ) ||
                ( (firstSquareId>=32 && firstSquareId<=39) && (firstSquareId-i>=32) ) ||
                ( (firstSquareId>=40 && firstSquareId<=47) && (firstSquareId-i>=40) ) ||
                ( (firstSquareId>=48 && firstSquareId<=55) && (firstSquareId-i>=48) ) ||
                ( (firstSquareId>=56 && firstSquareId<=63) && (firstSquareId-i>=56) ) 
                 )
             {
                 allSquares[firstSquareId-i].classList.add("checkedByBlack");
             }
        }

        //bishop part
        for(let i = 1; i<=7; i++)
        {
             if( firstSquareId-i*7>=0 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId-i*7].style.backgroundColor) &&
                 ( allSquares[firstSquareId-i*7].classList.contains("white") || allSquares[firstSquareId-i*7].classList.contains("black") )
             )
             {
                 if(allSquares[firstSquareId-i*7].classList.contains("white"))
                     allSquares[firstSquareId-i*7].classList.add("checkedByBlack");
                 break;
             }
             else if(
                 firstSquareId-i*7>=0
                 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId-i*7].style.backgroundColor)
                 )
             {   
                 allSquares[firstSquareId-i*7].classList.add("checkedByBlack");
             }
        }

        for(let i = 1; i<=7; i++)
        {
             if( firstSquareId+i*7<=63 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId+i*7].style.backgroundColor) &&
                 ( allSquares[firstSquareId+i*7].classList.contains("white") || allSquares[firstSquareId+i*7].classList.contains("black") )
             )
             {
                 if(allSquares[firstSquareId+i*7].classList.contains("white"))
                     allSquares[firstSquareId+i*7].classList.add("checkedByBlack");
                 break;
             }
             else if(
                 firstSquareId+i*7<=63
                 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId+i*7].style.backgroundColor)
                 )
             {   
                 allSquares[firstSquareId+i*7].classList.add("checkedByBlack");
             }
        }

        for(let i = 1; i<=7; i++)
        {
             if( firstSquareId+i*9<=63 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId+i*9].style.backgroundColor) &&
                 ( allSquares[firstSquareId+i*9].classList.contains("white") || allSquares[firstSquareId+i*9].classList.contains("black") )
             )
             {
                 if(allSquares[firstSquareId+i*9].classList.contains("white"))
                     allSquares[firstSquareId+i*9].classList.add("checkedByBlack");
                 break;
             }
             else if(
                 firstSquareId+i*9<=63
                 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId+i*9].style.backgroundColor)
                 )
             {   
                 allSquares[firstSquareId+i*9].classList.add("checkedByBlack");
             }
        }

        for(let i = 1; i<=7; i++)
        {
             if( firstSquareId-i*9>=0 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId-i*9].style.backgroundColor) &&
                 ( allSquares[firstSquareId-i*9].classList.contains("white") || allSquares[firstSquareId-i*9].classList.contains("black") )
             )
             {
                 if(allSquares[firstSquareId-i*9].classList.contains("white"))
                     allSquares[firstSquareId-i*9].classList.add("checkedByBlack");
                 break;
             }
             else if(
                 firstSquareId-i*9>=0
                 && 
                (allSquares[firstSquareId].style.backgroundColor ==  allSquares[firstSquareId-i*9].style.backgroundColor)
                 )
             {   
                 allSquares[firstSquareId-i*9].classList.add("checkedByBlack");
             }
        }
    }

    function checkedByBlackKing(firstSquareId){
        if(
            firstSquareId+8 <= 63 && !allSquares[firstSquareId+8].classList.contains("black") 
         )
         {
            allSquares[firstSquareId+8].classList.add("checkedByBlack");
         }
 
         if(
            firstSquareId-8 >= 0 && !allSquares[firstSquareId-8].classList.contains("black") 
         )
         {
            allSquares[firstSquareId-8].classList.add("checkedByBlack");
         }
 
         if(
            firstSquareId-1 >= 0 && 
            (
                (firstSquareId > 0 &&firstSquareId <= 7) || (firstSquareId > 8 &&firstSquareId <= 15) || (firstSquareId > 16 &&firstSquareId <= 23) ||
                (firstSquareId > 24 &&firstSquareId <= 31) || (firstSquareId > 32 &&firstSquareId <= 39) || (firstSquareId > 40 &&firstSquareId <= 47) ||
                (firstSquareId > 48 &&firstSquareId <= 55) || (firstSquareId > 56 &&firstSquareId <= 63) 
            ) && 
            !allSquares[firstSquareId-1].classList.contains("black")
         )
         {
            allSquares[firstSquareId-1].classList.add("checkedByBlack");
         }
 
         if(
            firstSquareId-9 >= 0 && 
            (
                (firstSquareId > 0 &&firstSquareId <= 7) || (firstSquareId > 8 &&firstSquareId <= 15) || (firstSquareId > 16 &&firstSquareId <= 23) ||
                (firstSquareId > 24 &&firstSquareId <= 31) || (firstSquareId > 32 &&firstSquareId <= 39) || (firstSquareId > 40 &&firstSquareId <= 47) ||
                (firstSquareId > 48 &&firstSquareId <= 55) || (firstSquareId > 56 &&firstSquareId <= 63) 
            ) && 
            !allSquares[firstSquareId-9].classList.contains("black") 
         )
         {
            allSquares[firstSquareId-9].classList.add("checkedByBlack");
         }
 
         if(
            firstSquareId+7 <=63 && 
            (
                (firstSquareId > 0 &&firstSquareId <= 7) || (firstSquareId > 8 &&firstSquareId <= 15) || (firstSquareId > 16 &&firstSquareId <= 23) ||
                (firstSquareId > 24 &&firstSquareId <= 31) || (firstSquareId > 32 &&firstSquareId <= 39) || (firstSquareId > 40 &&firstSquareId <= 47) ||
                (firstSquareId > 48 &&firstSquareId <= 55) || (firstSquareId > 56 &&firstSquareId <= 63) 
            ) && 
            !allSquares[firstSquareId+7].classList.contains("black")
         )
         {
            allSquares[firstSquareId+7].classList.add("checkedByBlack");
         }
 
         if(
            firstSquareId + 1 <= 63 &&
            (
                (firstSquareId >= 0 &&firstSquareId < 7) || (firstSquareId >= 8 &&firstSquareId < 15) || (firstSquareId >= 16 &&firstSquareId < 23) ||
                (firstSquareId >= 24 &&firstSquareId < 31) || (firstSquareId >= 32 &&firstSquareId < 39) || (firstSquareId >= 40 &&firstSquareId < 47) ||
                (firstSquareId >= 48 &&firstSquareId < 55) || (firstSquareId >= 56 &&firstSquareId < 63) 
            ) && 
            !allSquares[firstSquareId+1].classList.contains("black")
         )
         {
            allSquares[firstSquareId+1].classList.add("checkedByBlack");
         }
 
         if(
            firstSquareId + 9 <= 63 &&
            (
                (firstSquareId >= 0 &&firstSquareId < 7) || (firstSquareId >= 8 &&firstSquareId < 15) || (firstSquareId >= 16 &&firstSquareId < 23) ||
                (firstSquareId >= 24 &&firstSquareId < 31) || (firstSquareId >= 32 &&firstSquareId < 39) || (firstSquareId >= 40 &&firstSquareId < 47) ||
                (firstSquareId >= 48 &&firstSquareId < 55) || (firstSquareId >= 56 &&firstSquareId < 63) 
            ) && 
            !allSquares[firstSquareId+9].classList.contains("black")
         )
         {
            allSquares[firstSquareId+9].classList.add("checkedByBlack");
         }
 
         if(
            firstSquareId - 7 >= 0 &&
            (
                (firstSquareId >= 0 &&firstSquareId < 7) || (firstSquareId >= 8 &&firstSquareId < 15) || (firstSquareId >= 16 &&firstSquareId < 23) ||
                (firstSquareId >= 24 &&firstSquareId < 31) || (firstSquareId >= 32 &&firstSquareId < 39) || (firstSquareId >= 40 &&firstSquareId < 47) ||
                (firstSquareId >= 48 &&firstSquareId < 55) || (firstSquareId >= 56 &&firstSquareId < 63) 
            ) && 
            !allSquares[firstSquareId-7].classList.contains("black")
         )
         {
            allSquares[firstSquareId-7].classList.add("checkedByBlack");
         }
    }

    //
    function restrictBlackMoveUnderCheck(firstSquare,secondSquare){
        
        if(secondSquare.classList.contains("blackPawn"))
        {
            //individual
            firstSquare.classList.add("blackPawn");
            firstSquare.classList.add("black");
            secondSquare.classList.remove("blackPawn");
            secondSquare.classList.remove("black");
            //common
            document.querySelector(".blackKing").classList.remove("kingUnderCheck");           
            document.querySelector(".blackKing").classList.remove("checkedByWhite");
            turnForWhite = !turnForWhite;
            restrictionNeeded = true;
        }

        if(secondSquare.classList.contains("blackRook"))
        {
            //individual
            firstSquare.classList.add("blackRook");
            firstSquare.classList.add("black");
            secondSquare.classList.remove("blackRook");
            secondSquare.classList.remove("black");
            //common
            document.querySelector(".blackKing").classList.remove("kingUnderCheck");
            document.querySelector(".blackKing").classList.remove("checkedByWhite");
            turnForWhite = !turnForWhite;
            restrictionNeeded = true;
        }

        if(secondSquare.classList.contains("blackBishop"))
        {
            //individual
            firstSquare.classList.add("blackBishop");
            firstSquare.classList.add("black");
            secondSquare.classList.remove("blackBishop");
            secondSquare.classList.remove("black");
            //common
            document.querySelector(".blackKing").classList.remove("kingUnderCheck");
            document.querySelector(".blackKing").classList.remove("checkedByWhite");
            turnForWhite = !turnForWhite;
            restrictionNeeded = true;
        }

        if(secondSquare.classList.contains("blackKnight"))
        {
            //individual
            firstSquare.classList.add("blackKnight");
            firstSquare.classList.add("black");
            secondSquare.classList.remove("blackKnight");
            secondSquare.classList.remove("black");
            //common
            document.querySelector(".blackKing").classList.remove("kingUnderCheck");
            document.querySelector(".blackKing").classList.remove("checkedByWhite");
            turnForWhite = !turnForWhite;
            restrictionNeeded = true;
        }

        if(secondSquare.classList.contains("blackQueen"))
        {
            //individual
            firstSquare.classList.add("blackQueen");
            firstSquare.classList.add("black");
            secondSquare.classList.remove("blackQueen");
            secondSquare.classList.remove("black");
            //common
            document.querySelector(".blackKing").classList.remove("kingUnderCheck");
            document.querySelector(".blackKing").classList.remove("checkedByWhite");
            turnForWhite = !turnForWhite;
            restrictionNeeded = true;
        }

        if(secondSquare.classList.contains("blackKing"))
        {
            //individual
            firstSquare.classList.add("blackKing");
            firstSquare.classList.add("black");
            secondSquare.classList.remove("blackKing");
            secondSquare.classList.remove("black");
            //common
            document.querySelector(".blackKing").classList.remove("kingUnderCheck");
            document.querySelector(".blackKing").classList.remove("checkedByWhite");
            turnForWhite = !turnForWhite;
            restrictionNeeded = true;
        }
    }


    function restrictWhiteMoveUnderCheck(firstSquare, secondSquare){
        if(secondSquare.classList.contains("whitePawn"))
        {
            //individual
            firstSquare.classList.add("whitePawn");
            firstSquare.classList.add("white");
            secondSquare.classList.remove("whitePawn");
            secondSquare.classList.remove("white");
            //common
            document.querySelector(".whiteKing").classList.remove("kingUnderCheck");
            document.querySelector(".whiteKing").classList.remove("checkedByWhite");
            turnForWhite = !turnForWhite;
            restrictionNeeded = true;
        }

        if(secondSquare.classList.contains("whiteRook"))
        {
            //individual
            firstSquare.classList.add("whiteRook");
            firstSquare.classList.add("white");
            secondSquare.classList.remove("whiteRook");
            secondSquare.classList.remove("white");
          //common
          document.querySelector(".whiteKing").classList.remove("kingUnderCheck");
          document.querySelector(".whiteKing").classList.remove("checkedByWhite");
          turnForWhite = !turnForWhite;
          restrictionNeeded = true;
        }

        if(secondSquare.classList.contains("whiteBishop"))
        {
            //individual
            firstSquare.classList.add("whiteBishop");
            firstSquare.classList.add("white");
            secondSquare.classList.remove("whiteBishop");
            secondSquare.classList.remove("white");
           //common
           document.querySelector(".whiteKing").classList.remove("kingUnderCheck");
           document.querySelector(".whiteKing").classList.remove("checkedByWhite");
           turnForWhite = !turnForWhite;
           restrictionNeeded = true;
        }

        if(secondSquare.classList.contains("whiteKnight"))
        {
            //individual
            firstSquare.classList.add("whiteKnight");
            firstSquare.classList.add("white");
            secondSquare.classList.remove("whiteKnight");
            secondSquare.classList.remove("white");
              //common
              document.querySelector(".whiteKing").classList.remove("kingUnderCheck");
              document.querySelector(".whiteKing").classList.remove("checkedByWhite");
              turnForWhite = !turnForWhite;
              restrictionNeeded = true;
        }

        if(secondSquare.classList.contains("whiteQueen"))
        {
            //individual
            firstSquare.classList.add("whiteQueen");
            firstSquare.classList.add("white");
            secondSquare.classList.remove("whiteQueen");
            secondSquare.classList.remove("white");
            //common
            document.querySelector(".whiteKing").classList.remove("kingUnderCheck");
            document.querySelector(".whiteKing").classList.remove("checkedByWhite");
            turnForWhite = !turnForWhite;
            restrictionNeeded = true;
        }

        if(secondSquare.classList.contains("whiteKing"))
        {
            //individual
            firstSquare.classList.add("whiteKing");
            firstSquare.classList.add("white");
            secondSquare.classList.remove("whiteKing");
            secondSquare.classList.remove("white");
              //common
              document.querySelector(".whiteKing").classList.remove("kingUnderCheck");
              document.querySelector(".whiteKing").classList.remove("checkedByWhite");
              turnForWhite = !turnForWhite;
              restrictionNeeded = true;
        }
    }


    //here we check the piece conntained in secondSquare

    function checkPieceContainedInSeceondSquare(secondSquare){

        if(secondSquare.classList.contains("whitePawn"))
        {
            whitePawn = true;
        }
        else if(secondSquare.classList.contains("whiteRook"))
        {
            whiteRook = true;
        }
        else if(secondSquare.classList.contains("whiteKnight"))
        {
            whiteKnight = true;
        }
        else if(secondSquare.classList.contains("whiteBishop"))
        {
            whiteBishop = true;
        }
        else if(secondSquare.classList.contains("whiteQueen"))
        {
            whiteQueen = true;
        }
        else if(secondSquare.classList.contains("blackPawn"))
        {
            blackPawn = true;
        }
        else if(secondSquare.classList.contains("blackRook"))
        {
            blackRook = true;
        }
        else if(secondSquare.classList.contains("blackKnight"))
        {
            blackKnight = true;
        }
        else if(secondSquare.classList.contains("blackBishop"))
        {
            blackBishop = true;
        }
        else if(secondSquare.classList.contains("blackQueen"))
        {
            blackQueen = true;
        }

    }


    //
    function restricionForSecondSquare(secondSquare){
        if(whitePawn && restrictionNeeded)
        {
            secondSquare.classList.add("white");
            secondSquare.classList.add("whitePawn");
            whitePawn = false;
            restrictionNeeded = false;
        }
        else if(whiteRook && restrictionNeeded)
        {
            secondSquare.classList.add("white");
            secondSquare.classList.add("whiteRook");
            whiteRook = false;
            restrictionNeeded = false;
        }
        else if(whiteBishop && restrictionNeeded)
        {
            secondSquare.classList.add("white");
            secondSquare.classList.add("whiteBishop");
            whiteBishop = false;
            restrictionNeeded = false;
        }
        else if(whiteKnight && restrictionNeeded)
        {
            secondSquare.classList.add("white");
            secondSquare.classList.add("whiteKnight");
            whiteKnight = false;
            restrictionNeeded = false;
        }
        else if(whiteQueen && restrictionNeeded)
        {
            secondSquare.classList.add("white");
            secondSquare.classList.add("whiteQueen");
            whiteQueen = false;
            restrictionNeeded = false;
        }
        //black
        else if(blackPawn && restrictionNeeded)
        {
            secondSquare.classList.add("black");
            secondSquare.classList.add("blackPawn");
            blackPawn = false;
            restrictionNeeded = false;
        }
        else if(blackRook && restrictionNeeded)
        {
            secondSquare.classList.add("black");
            secondSquare.classList.add("blackRook");
            blackRook = false;
            restrictionNeeded = false;
        }
        else if(blackBishop && restrictionNeeded)
        {
            secondSquare.classList.add("black");
            secondSquare.classList.add("blackBishop");
            blackBishop = false;
            restrictionNeeded = false;
        }
        else if(blackKnight && restrictionNeeded)
        {
            secondSquare.classList.add("black");
            secondSquare.classList.add("blackKnight");
            blackKnight = false;
            restrictionNeeded = false;
        }
        else if(blackQueen && restrictionNeeded)
        {
            secondSquare.classList.add("black");
            secondSquare.classList.add("blackQueen");
            blackQueen = false;
            restrictionNeeded = false;
        }
        else
        {
            whitePawn = false;
            whiteRook = false;
            whiteBishop = false;
            whiteKnight = false;
            whiteQueen = false;
            blackPawn = false;
            blackRook = false;
            blackBishop = false;
            blackKnight = false;
            blackQueen = false;
            restrictionNeeded = false;
        }


    }
})