import { AppDataSource } from '../database/dataSource';

const userBookHistoryRepository = AppDataSource.getRepository(UserBookHistory);
import { Book, User, UserBookHistory } from '../entity';

interface createUserBookHistory {
  pastScore: number;
  pastBook: Book;
  pastUser: User;
}

export async function createUserBookHistory(createUserBookHistoryDto: createUserBookHistory) {
  await userBookHistoryRepository.insert({ ...createUserBookHistoryDto });
}

export async function findBookPastByBook(book: Book) {
  const bookHistory = await userBookHistoryRepository.find({
    where: {
      pastBook: book,
    },
  });
  return bookHistory;
}

export async function getAverageBookScore(bookHistory: UserBookHistory[], currentScore: number) {
  const totalScore = bookHistory.reduce((acc, history) => acc + history.pastScore, 0);
  const averageScore = (totalScore + currentScore) / bookHistory.length + 1;
  return averageScore;
}
