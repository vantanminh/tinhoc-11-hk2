const STORAGE_KEY = "tin11_hk2_tracnghiem_v1";
const APP_VERSION = 1;
const ANSWER_ORDER = ["A", "B", "C", "D"];

const modeLabels = {
  smart: "Thông minh",
  all: "Tất cả câu",
  unseen: "Chưa học",
  review: "Cần ôn",
  learning: "Đang học",
  mastered: "Đã chắc",
};

const statusLabels = {
  unseen: "Chưa học",
  learning: "Đang học",
  review: "Cần ôn",
  mastered: "Đã chắc",
};

const sectionConfig = [
  { id: "all", title: "Tất cả", subtitle: "80 câu" },
  { id: "sec1", title: "Phần 1", subtitle: "1-15 • Danh sách cơ bản" },
  { id: "sec2", title: "Phần 2", subtitle: "16-30 • Danh sách & mảng 2D" },
  { id: "sec3", title: "Phần 3", subtitle: "31-50 • Thuật toán tìm kiếm" },
  { id: "sec4", title: "Phần 4", subtitle: "51-66 • Tệp & sắp xếp" },
  { id: "sec5", title: "Phần 5", subtitle: "67-80 • Kiểm thử & độ phức tạp" },
];

const assetNotes = [
  {
    id: 55,
    required: true,
    text: "Thiếu đoạn mã chương trình ghi dữ liệu ra tệp output.txt trong bản OCR.",
  },
  {
    id: 77,
    required: true,
    text: "Thiếu đoạn chương trình và dữ liệu dayso trong bản OCR.",
  },
  {
    id: 79,
    required: true,
    text: "Thiếu chương trình đếm số ước số thực sự trong bản OCR.",
  },
  {
    id: 80,
    required: false,
    text: "Có thể thêm ảnh/đoạn mã gốc nếu muốn hiển thị sát đề hơn.",
  },
];

const q = (id, stem, options, answer, extra = {}) => ({
  id,
  stem,
  options,
  answer,
  ...extra,
});

function getSectionInfo(id) {
  if (id <= 15) {
    return {
      sectionId: "sec1",
      sectionTitle: "Phần 1 • Danh sách Python cơ bản",
    };
  }
  if (id <= 30) {
    return {
      sectionId: "sec2",
      sectionTitle: "Phần 2 • Danh sách nâng cao & mảng 2 chiều",
    };
  }
  if (id <= 50) {
    return {
      sectionId: "sec3",
      sectionTitle: "Phần 3 • Thuật toán tìm kiếm",
    };
  }
  if (id <= 66) {
    return {
      sectionId: "sec4",
      sectionTitle: "Phần 4 • Tệp & sắp xếp",
    };
  }
  return {
    sectionId: "sec5",
    sectionTitle: "Phần 5 • Kiểm thử, độ phức tạp, tính đúng",
  };
}

/*
  Nếu muốn thêm ảnh sau này, bạn chỉ cần thêm thuộc tính:
  image: "images/q55.png"
  vào object câu hỏi tương ứng.
*/

const questions = [
  // ===== Phần 1 =====
  q(1, `Trong Python, các phần tử của mảng cách nhau bởi dấu nào?`, { A: `dấu chấm (.)`, B: `dấu phẩy (,)`, C: `dấu cách ( )`, D: `dấu trừ (-)` }, `B`),
  q(2, `Trong Python, chỉ số của mảng bắt đầu từ số nào?`, { A: `0`, B: `1`, C: `2`, D: `3` }, `A`),
  q(3, `Trong Python, để kiểm tra một đối tượng có nằm trong mảng hay không ta dùng toán tử nào?`, { A: `not`, B: `or`, C: `in`, D: `and` }, `C`),
  q(4, `Trong Python, kiểu mảng là gì?`, { A: `array`, B: `float`, C: `str`, D: `list` }, `D`),
  q(5, `Trong Python, để bổ sung phần tử có giá trị m vào cuối mảng A, ta dùng lệnh nào?`, { A: `A.insert(m)`, B: `m.insert(A)`, C: `A.append(m)`, D: `m.append(A)` }, `C`),
  q(6, `Trong Python, để xóa toàn bộ các phần tử của mảng B, ta dùng lệnh nào?`, { A: `B.append()`, B: `B.remove()`, C: `B.insert()`, D: `B.clear()` }, `D`),
  q(7, `Trong Python, để biết số phần tử của mảng A dùng lệnh nào?`, { A: `append(A)`, B: `len(A)`, C: `str(A)`, D: `del(A)` }, `B`),
  q(8, `Trong Python, để bổ sung phần tử vào vị trí bất kì của mảng arr ta dùng lệnh nào?`, { A: `arr.append()`, B: `arr.remove()`, C: `arr.insert()`, D: `arr.clear()` }, `C`),
  q(9, `Trong Python, chọn lệnh khởi tạo mảng A gồm 3 phần tử có giá trị 1, 3 và 5?`, { A: `A = (1, 3, 5)`, B: `A = {1, 3, 5}`, C: `A = [1, 3, 5]`, D: `A = [1; 3; 5]` }, `C`),
  q(10, `Trong Python, để tham chiếu đến phần tử thứ ba của mảng arr ta dùng lệnh nào?`, { A: `arr[2]`, B: `arr[1]`, C: `arr[0]`, D: `arr[-1]` }, `A`),
  q(11, `Trong Python, để truy cập phần tử cuối cùng của một mảng, bạn sử dụng chỉ số nào?`, { A: `-1`, B: `0`, C: `1`, D: `không xác định` }, `A`),
  q(12, `Trong Python, lệnh nào sau đây dùng để lấy ra phần tử cuối cùng trong danh sách A?`, { A: `pop(A)`, B: `A.pop()`, C: `pop(len(A))`, D: `pop()` }, `B`),
  q(13, `Trong Python, để xuất phần tử kế phần tử cuối cùng trong danh sách A, phương án nào đúng?`, { A: `print(len(A) - 2)`, B: `print(A[len(A) - 2])`, C: `print(A[len(A) - 1])`, D: `print(A[len(A)])` }, `B`),
  q(14, `Trong Python, cho mảng numbers = [3, 7, 9, 2, 5], giá trị của numbers[2] là gì?`, { A: `3`, B: `7`, C: `9`, D: `2` }, `C`),
  q(15, `Trong Python, cho mảng colors = ['red', 'blue', 'green', 'yellow'], cách để truy cập phần tử 'green' là?`, { A: `colors[0]`, B: `colors[1]`, C: `colors[2]`, D: `colors[3]` }, `C`),

  // ===== Phần 2 =====
  q(16, `Trong Python, cho mảng numbers = [1, 2, 3, 4, 5], cách để thêm phần tử 6 vào cuối mảng là gì?`, { A: `numbers.add(6)`, B: `numbers.insert(6)`, C: `numbers.push(6)`, D: `numbers.append(6)` }, `D`),
  q(17, `Cho mảng numbers = [2, 4, 6, 8, 10], giá trị phần tử numbers[2] là gì?`, { A: `4`, B: `2`, C: `3`, D: `6` }, `D`),
  q(18, `Cho mảng numbers = [2, 4, 6, 8, 10], cách để tính tổng các phần tử trong mảng là?`, { A: `total(numbers)`, B: `add(numbers)`, C: `sum(numbers)`, D: `calculate(numbers)` }, `C`),
  q(19, `Cho mảng numbers = [5, 2, 8, 3, 9], cách để tìm giá trị lớn nhất trong mảng là?`, { A: `largest(numbers)`, B: `max(numbers)`, C: `maximum(numbers)`, D: `find_max(numbers)` }, `B`),
  q(
    20,
    `Trong Python, cho đoạn lệnh sau. Sau khi thực hiện thì được dãy số A nào?`,
    {
      A: `[7, 26, 48, 9, 35, 46, 5, 9, 83]`,
      B: `[7, 26, 48, 9, 22, 35, 5, 9, 82]`,
      C: `[7, 3, 26, 48, 9, 22, 46, 5, 9, 83]`,
      D: `[7, 26, 48, 9, 22, 35, 46, 9, 83]`,
    },
    `A`,
    {
      code: `A = [7, 3, 26, 48, 9, 22, 35, 46]
A.remove(3)
A.append(5)
A.append(9)
A.append(83)
A.remove(22)`,
    }
  ),
  q(21, `Để xuất phần tử cuối cùng trong danh sách A, phương án nào sau đây đúng?`, { A: `print(A[len(A) - 1])`, B: `print(A[len(A)])`, C: `print(A[len(A) - 2])`, D: `print(len(A) - 1)` }, `A`),
  q(
    22,
    `Cho đoạn lệnh sau, dãy số Arr thu được là dãy số nào?`,
    {
      A: `[5, 9, 7, 3, 4, 1]`,
      B: `[5, 7, 9, 3, 4, 1]`,
      C: `[5, 7, 3, 4, 1, 2, 9]`,
      D: `[5, 7, 3, 4, 1, 2]`,
    },
    `B`,
    {
      code: `Arr = [5, 7, 3, 4, 1]
Arr.insert(2, 9)`,
    }
  ),
  q(
    23,
    `Cho mảng 2 chiều A dưới đây. Giá trị của phần tử tại hàng 3, cột 1 là bao nhiêu?`,
    { A: `11`, B: `96`, C: `92`, D: `65` },
    `D`,
    {
      code: `A = [[42, 76, 92],
     [11, 45, 20],
     [65, 38, 57],
     [19, 96, 45],
     [92, 88, 191]]`,
      note: `Lưu ý: trong câu này đề đang đếm hàng/cột theo thứ tự 1, 2, 3...`,
    }
  ),
  q(
    24,
    `Cho mảng 2 chiều arr dưới đây. Để in ra hàng thứ 2 của mảng trên, bạn sử dụng câu lệnh nào?`,
    { A: `print(arr[:,-1])`, B: `print(arr[2])`, C: `print(arr[2, :])`, D: `print(arr[1])` },
    `D`,
    {
      code: `arr = [[10, 20, 30], [40, 50, 60], [70, 80, 90]]`,
    }
  ),
  q(25, `Tạo trực tiếp mảng hai chiều, câu nào dưới đây đúng?`, { A: `A = [1, 2, 3, 4]`, B: `B = ["Hà"; "Quang"; "Lan"]`, C: `D = [[1, 3, 5], [2, 5, 9], [5, 9, 20]]`, D: `C = [1, 3, 5], [2, 5, 9], [5, 9, 20]` }, `C`),
  q(26, `Cho các câu sau thao tác với mảng một chiều A, chọn câu sai?`, { A: `A.append(): bổ sung phần tử vào cuối A`, B: `A.remove(): xóa một phần tử trong A`, C: `A.remove(): xóa toàn bộ phần tử trong A`, D: `A.clear(): xóa toàn bộ phần tử trong A` }, `C`),
  q(27, `Để xóa 3 phần tử đầu tiên trong danh sách a, phương án nào đúng?`, { A: `del(a[3])`, B: `del(a[0:3])`, C: `del(a[0:2])`, D: `del(a[1:3])` }, `B`),
  q(
    28,
    `Cho đoạn lệnh sau, danh sách A thu được sau khi chạy đoạn lệnh là gì?`,
    { A: `[7, 3, 1, 9]`, B: `[7, 3, 8, 9]`, C: `[7, 8, 1, 9]`, D: `[7, 3, 8, 1]` },
    `B`,
    {
      code: `A = [7, 3, 8, 1, 9]
del(A[3])`,
    }
  ),
  q(29, `Cho các câu sau, chọn câu đúng?`, { A: `Xuất mảng theo hàng ngang, mỗi số cách nhau dấu cách: for m in B: print(m, end=" ")`, B: `Xuất mảng theo hàng dọc: for m in B: print(m, end=" ")`, C: `C = [1, 3, 5], [2, 5, 9], [5, 9, 20] là mảng hai chiều`, D: `Xuất mảng B theo chiều ngược lại: for m in B[::1]: print(m, end=" ")` }, `A`),
  q(30, `Dùng lệnh nào sau đây để xóa phần tử cuối cùng trong danh sách A?`, { A: `pop(A)`, B: `A.remove(A[-1])`, C: `A.pop(A[len(A)])`, D: `pop(len(A))` }, `B`),

  // ===== Phần 3 =====
  q(31, `Thuật toán tìm kiếm nào dưới đây yêu cầu mảng đã được sắp xếp trước khi thực hiện?`, { A: `Tìm kiếm tuần tự`, B: `Tìm kiếm nội suy`, C: `Tìm kiếm nhị phân`, D: `Tìm kiếm trong cây` }, `C`),
  q(32, `Trong thuật toán tìm kiếm nhị phân, mảng được chia nhỏ mỗi lần tìm kiếm dựa trên điều gì?`, { A: `Giá trị của phần tử đầu tiên`, B: `Giá trị trung bình của mảng`, C: `Giá trị nhỏ nhất của mảng`, D: `Giá trị tại chỉ số trung tâm của mảng` }, `D`),
  q(33, `Chọn câu diễn đạt đúng hoạt động của thuật toán tìm kiếm tuần tự?`, { A: `Tìm trên danh sách đã sắp xếp, bắt đầu từ đầu danh sách, chừng nào chưa tìm thấy hoặc chưa tìm hết thì còn tìm tiếp`, B: `Tìm trên danh sách đã sắp xếp, bắt đầu từ giữa danh sách, chừng nào chưa tìm thấy hoặc chưa tìm hết thì còn tìm tiếp`, C: `Tìm trên danh sách bất kì, bắt đầu từ giữa danh sách, chừng nào chưa tìm thấy hoặc chưa tìm hết thì còn tìm tiếp`, D: `Tìm trên danh sách bất kì, bắt đầu từ đầu danh sách, chừng nào chưa tìm thấy hoặc chưa tìm hết thì còn tìm tiếp` }, `D`),
  q(34, `Trong tìm kiếm tuần tự thì điều kiện cần kiểm tra để dừng vòng lặp là gì?`, { A: `Tìm thấy vị trí i của phần tử K`, B: `Đã duyệt hết các phần tử khi tìm thấy vị trí của K`, C: `Tìm thấy vị trí i của phần tử K hoặc duyệt đến phần tử cuối cùng mà vẫn chưa thấy giá trị bằng K`, D: `Duyệt lần lượt các phần tử từ đầu đến cuối dãy` }, `C`),
  q(35, `Trong tìm kiếm tuần tự thì có mấy điều kiện cần kiểm tra để dừng vòng lặp?`, { A: `1`, B: `2`, C: `3`, D: `4` }, `B`),
  q(36, `Trong thuật toán tìm kiếm nhị phân, chỉ số mid được tính theo công thức nào?`, { A: `mid = (left + right) // 2`, B: `mid = (left + right) % 2`, C: `mid = (left + right) / 2`, D: `mid = (left + right // 3)` }, `A`),
  q(37, `Thuật toán tìm kiếm tuần tự cần bao nhiêu bước để tìm thấy số 7 trong danh sách A = [1, 4, 8, 7, 10, 28]?`, { A: `2`, B: `3`, C: `4`, D: `5` }, `C`),
  q(38, `Thuật toán tìm kiếm tuần tự cần bao nhiêu bước để tìm thấy số 25 trong danh sách B = [3, 5, 41, 7, 11, 46, 58, 79, 93, 25]?`, { A: `9`, B: `10`, C: `11`, D: `8` }, `B`),
  q(
    39,
    `Cho các câu sau, chọn câu sai?`,
    {
      A: `Với K = 11, thuật toán tìm kiếm tuần tự sẽ thực hiện 5 bước chạy`,
      B: `Với K = 8, thuật toán tìm kiếm tuần tự thì chỉ số của K trong mảng A là 3`,
      C: `Với K = 12, thuật toán tìm kiếm nhị phân sẽ thực hiện 4 bước chạy`,
      D: `Với K = 11, thuật toán tìm kiếm nhị phân sau khi chạy xong bước 1 thì phạm vi tìm kiếm được giới hạn thành [11, 12, 18, 21]`,
    },
    `C`,
    {
      code: `A = [1, 4, 5, 8, 11, 12, 18, 21]
K = int(input("Moi nhap K:"))`,
    }
  ),
  q(
    40,
    `Thuật toán tìm kiếm nhị phân cần bao nhiêu bước để tìm thấy số 34 trong dãy A dưới đây?`,
    { A: `3`, B: `4`, C: `5`, D: `6` },
    `A`,
    {
      code: `A = [0, 4, 9, 10, 12, 14, 17, 18, 20, 31, 34, 67]`,
    }
  ),
  q(
    41,
    `Cho dãy số A dưới đây. Với thuật toán tìm kiếm nhị phân thì tại bước số 3, giá trị của giới hạn bên trái, bên phải và giá trị giữa khi tìm kiếm 755 là bao nhiêu?`,
    { A: `9, 16, 12`, B: `13, 16, 14`, C: `15, 16, 15`, D: `16, 16, 16` },
    `B`,
    {
      code: `A = [1, 5, 8, 11, 16, 22, 34, 46, 57, 61, 83, 94, 102, 305, 457, 633, 755]`,
    }
  ),
  q(
    42,
    `Cho dãy số A dưới đây. Với thuật toán tìm kiếm nhị phân thì tại bước số 2, giá trị của giới hạn bên trái, bên phải và giá trị giữa khi tìm kiếm 755 là bao nhiêu?`,
    { A: `9, 16, 12`, B: `13, 16, 14`, C: `15, 16, 15`, D: `0, 8, 16` },
    `A`,
    {
      code: `A = [1, 5, 8, 11, 16, 22, 34, 46, 57, 61, 83, 94, 102, 305, 457, 633, 755]`,
    }
  ),
  q(43, `Trong thuật toán tìm kiếm nhị phân với dãy số A tăng dần thì khi A[mid] < K ở bước 1, ta có`, { A: `Left = 0, Right = mid - 1`, B: `Left = mid + 1, Right = len(A)`, C: `Left = mid + 1, Right = len(A) - 1`, D: `Left = mid + 1, Right = mid - 1` }, `C`),
  q(44, `Trong thuật toán tìm kiếm nhị phân với dãy số A tăng dần thì khi A[mid] > K ở bước 1, ta có`, { A: `Left = 0, Right = mid - 1`, B: `Left = mid + 1, Right = mid - 1`, C: `Left = mid + 1, Right = len(A) - 1`, D: `Left = 0, Right = mid + 1` }, `A`),
  q(45, `Trong thuật toán tìm kiếm nhị phân với dãy số A giảm dần thì khi A[mid] < K ở bước 1, ta có`, { A: `Left = 0, Right = mid - 1`, B: `Left = mid + 1, Right = mid - 1`, C: `Left = mid + 1, Right = len(A) - 1`, D: `Left = 0, Right = mid + 1` }, `A`),
  q(46, `Trong thuật toán tìm kiếm nhị phân với dãy số A giảm dần thì khi A[mid] > K ở bước 1, ta có`, { A: `Left = 0, Right = mid - 1`, B: `Left = mid + 1, Right = mid - 1`, C: `Left = mid + 1, Right = len(A) - 1`, D: `Left = 0, Right = mid + 1` }, `C`),
  q(
    47,
    `Thuật toán tìm kiếm nhị phân cần bao nhiêu bước để tìm thấy số 170 trong dãy số sau?`,
    { A: `3`, B: `4`, C: `5`, D: `6` },
    `B`,
    {
      code: `A = [1, 2, 3, 12, 14, 17, 19, 20, 25, 30, 36, 52, 56, 163, 170]`,
    }
  ),
  q(
    48,
    `Thuật toán tìm kiếm nhị phân cần bao nhiêu bước để tìm thấy số 20 trong dãy số sau?`,
    { A: `5`, B: `4`, C: `3`, D: `2` },
    `D`,
    {
      code: `A = [0, 4, 9, 10, 12, 14, 17, 18, 20, 31, 34, 67]`,
    }
  ),
  q(
    49,
    `Cho các câu sau, chọn câu sai?`,
    {
      A: `Với K = 17, thuật toán tìm kiếm tuần tự sẽ thực hiện 5 bước chạy`,
      B: `Với K = 18, thuật toán tìm kiếm tuần tự thì chỉ số của K trong mảng A là 6`,
      C: `Với K = 12, thuật toán tìm kiếm nhị phân sẽ thực hiện 3 bước chạy`,
      D: `Với K = 11, thuật toán nhị phân sau khi chạy xong bước 1 thì phạm vi tìm kiếm được giới hạn thành [12, 17, 18, 21]`,
    },
    `A`,
    {
      code: `A = [1, 4, 5, 8, 12, 17, 18, 21]
K = int(input("Moi nhap K:"))`,
    }
  ),
  q(
    50,
    `Thuật toán tìm kiếm nhị phân cần bao nhiêu bước để tìm thấy số 163 trong dãy số sau?`,
    { A: `3`, B: `4`, C: `5`, D: `14` },
    `B`,
    {
      code: `A = [1, 2, 3, 12, 14, 17, 19, 20, 25, 30, 36, 52, 56, 163]`,
    }
  ),

  // ===== Phần 4 =====
  q(51, `Thuật toán sắp xếp nào hoạt động bằng cách so sánh từng cặp phần tử liên tiếp và đổi chỗ nếu chúng không đúng thứ tự?`, { A: `Sắp xếp chèn`, B: `Sắp xếp lựa chọn`, C: `Sắp xếp nổi bọt`, D: `Sắp xếp nhanh` }, `C`),
  q(52, `Đâu là lệnh mở tệp để đọc?`, { A: `f = open(<file name>, "r", encoding="UTF-8")`, B: `f = open(<file name>, "a", encoding="UTF-8")`, C: `f = open(<file name>, "w", encoding="UTF-8")`, D: `f.close()` }, `A`),
  q(53, `Đâu là lệnh đọc một dòng tiếp theo từ f?`, { A: `f.readlines()`, B: `L = list(f)`, C: `f.close()`, D: `f.readline()` }, `D`),
  q(
    54,
    `Bổ sung đoạn lệnh sau để xuất ra mảng Diem từ tệp Data.txt.`,
    {
      A: `L = line.split()`,
      B: `Ten.append(L[0])`,
      C: `return Diem`,
      D: `Không có đáp án`,
    },
    `A`,
    {
      code: `file = r"Data.txt"
f = open(file, encoding="UTF-8")
Diem = []
for line in f:
    ----------------------------
    Diem.append(float(L[1]))
f.close()
print(Diem)

Data.txt
Hà 9.6
Bình 8.5
Quang 7.2`,
    }
  ),
  q(
    55,
    `Giả sử có hai mảng Ten và Diem tương ứng với dữ liệu tên và điểm của học sinh trong lớp. Chương trình sau ghi những dòng thông tin này ra tệp "output.txt". Hỏi chương trình lỗi ở mấy dòng?`,
    { A: `0`, B: `1`, C: `2`, D: `3` },
    `C`,
    {
      imageNote: `Bản OCR hiện thiếu đoạn mã gốc của câu 55. Bạn nên thêm ảnh/đoạn mã gốc để luyện sát đề. Web hiện chấm theo key: C.`,
    }
  ),
  q(56, `Các nhiệm vụ để thực hiện việc sắp xếp gồm những gì?`, { A: `Đổi chỗ`, B: `So sánh và đổi chỗ`, C: `So sánh`, D: `Xóa và đổi chỗ` }, `B`),
  q(57, `Thuật toán sắp xếp nổi bọt sắp xếp danh sách bằng cách nào?`, { A: `Hoán đổi`, B: `Thay thế`, C: `Thay đổi`, D: `Sửa đổi` }, `A`),
  q(58, `Trong thuật toán sắp xếp nổi bọt thì dấu hiệu để biết dãy chưa sắp xếp xong là gì?`, { A: `Vẫn còn cặp phần tử liền kề không đúng thứ tự mong muốn`, B: `Dãy chưa được sắp xếp tăng dần`, C: `Dãy chưa được sắp xếp giảm dần`, D: `Cả A, B và C` }, `A`),
  q(59, `Thuật toán sắp xếp nổi bọt sắp xếp danh sách bằng cách hoán đổi các phần tử liền kề khi chúng chưa đúng vị trí bao nhiêu lần?`, { A: `Hai lần`, B: `Nhiều lần`, C: `Một lần`, D: `Mười lần` }, `B`),
  q(60, `Cho dãy số 7, 9, 12, 5, 4. Nếu sử dụng thuật toán sắp xếp nổi bọt để sắp xếp dãy tăng dần thì sau bao nhiêu vòng lặp thuật toán kết thúc?`, { A: `3`, B: `4`, C: `5`, D: `6` }, `B`),
  q(61, `Cho dãy số 7, 9, 12, 5, 4. Nếu sử dụng thuật toán sắp xếp nổi bọt để sắp xếp dãy tăng dần thì sau vòng lặp thứ 3 ta được dãy số nào?`, { A: `[7, 9, 5, 4, 12]`, B: `[7, 5, 4, 9, 12]`, C: `[4, 5, 7, 9, 12]`, D: `[5, 4, 7, 9, 12]` }, `D`),
  q(62, `Cho dãy số 3, 12, 4, 15, 9. Nếu sử dụng thuật toán sắp xếp chọn để sắp xếp dãy tăng dần thì sau vòng lặp thứ 2 ta được dãy số nào?`, { A: `[3, 4, 12, 15, 9]`, B: `[3, 12, 4, 15, 9]`, C: `[3, 4, 9, 15, 12]`, D: `[3, 4, 9, 12, 15]` }, `A`),
  q(63, `Bạn Vy thực hiện thuật toán sắp xếp chọn để sắp xếp dãy chữ cái A = ["c", "g", "q", "a", "h", "m"] theo thứ tự tăng dần. Ở vòng lặp đầu tiên ta sẽ đổi vị trí của hai chữ cái nào với nhau?`, { A: `g và c`, B: `q và g`, C: `a và c`, D: `q và h` }, `C`),
  q(64, `Bạn An thực hiện thuật toán sắp xếp chọn để sắp xếp dãy số [64, 35, 17, 23, 11] theo thứ tự tăng dần. Kết thúc bước thứ 3 ta thu được dãy số nào?`, { A: `[11, 35, 17, 23, 64]`, B: `[11, 17, 23, 35, 64]`, C: `[11, 17, 35, 23, 64]`, D: `[64, 17, 23, 35, 11]` }, `B`),
  q(65, `Cho dãy số 9, 7, 12, 5, 4. Nếu sử dụng thuật toán sắp xếp chèn để sắp xếp dãy tăng dần thì sau vòng lặp thứ 2 ta được dãy số nào?`, { A: `[4, 5, 7, 9, 12]`, B: `[5, 7, 9, 12, 4]`, C: `[7, 9, 12, 5, 4]`, D: `[7, 9, 12, 4, 5]` }, `C`),
  q(66, `Cho dãy số 9, 7, 12, 5, 4. Nếu sử dụng thuật toán sắp xếp chèn để sắp xếp dãy tăng dần thì sau vòng lặp thứ 3 ta được dãy số nào?`, { A: `[4, 5, 7, 9, 12]`, B: `[5, 7, 9, 12, 4]`, C: `[7, 9, 12, 5, 4]`, D: `[7, 9, 12, 5, 4]` }, `B`),

  // ===== Phần 5 =====
  q(67, `Có bao nhiêu phương pháp để kiểm thử chương trình?`, { A: `1`, B: `2`, C: `3`, D: `4` }, `C`),
  q(68, `Đâu không là công cụ để kiểm thử chương trình?`, { A: `Công cụ in biến trung gian`, B: `Công cụ thống kê dữ liệu`, C: `Công cụ sinh các bộ dữ liệu test`, D: `Công cụ điểm dừng trong phần mềm soạn thảo lập trình` }, `B`),
  q(69, `Hoàn thành phát biểu sau: “Có rất nhiều công cụ và phương pháp khác nhau để kiểm thử chương trình. Các công cụ có mục đích … của chương trình và …, … các lỗi phát sinh trong tương lai”`, { A: `Tìm ra lỗi, phòng ngừa, ngăn chặn`, B: `Tìm ra lỗi, phòng ngừa, xử lí`, C: `Phòng ngừa, ngăn chặn, xử lí lỗi`, D: `Xử lí lỗi, phòng ngừa, ngăn chặn` }, `A`),
  q(70, `Phát biểu nào sau đây đúng?`, { A: `Kiểm thử sẽ giảm độ tin cậy của chương trình và chưa chứng minh được tính đúng của thuật toán và chương trình`, B: `Kiểm thử sẽ tăng độ tin cậy của chương trình nhưng chưa chứng minh được tính đúng của thuật toán và chương trình`, C: `Kiểm thử sẽ tăng độ tin cậy của chương trình và chứng minh được tính đúng của thuật toán và chương trình`, D: `Kiểm thử sẽ giảm độ tin cậy của chương trình nhưng chưa chứng minh được tính đúng của thuật toán và chương trình` }, `B`),
  q(71, `Tính đúng của thuật toán cần được chứng minh bằng gì?`, { A: `Thuật toán`, B: `Suy luận logic`, C: `Bộ dữ liệu kiểm thử`, D: `Lập luận toán học` }, `D`),
  q(72, `Hiệu quả hay tính tối ưu của chương trình thường được xem xét trên cơ sở đánh giá nào?`, { A: `Độ phức tạp thời gian`, B: `Độ phức tạp không gian`, C: `Độ phức tạp tính toán`, D: `Độ phức tạp của tập tin` }, `C`),
  q(73, `Hai tiêu chí đánh giá độ phức tạp tính toán quan trọng nhất là gì?`, { A: `Thời gian thực hiện và không gian bộ nhớ`, B: `Tính đúng và không gian bộ nhớ`, C: `Thuật toán và lập luận bài toán`, D: `Thời gian và tính tối ưu` }, `A`),
  q(74, `Độ phức tạp thời gian của một chương trình đo lường điều gì?`, { A: `Không gian bộ nhớ được sử dụng bởi chương trình`, B: `Thời gian mà chương trình mất để hoàn thành một nhiệm vụ, dựa trên kích thước của dữ liệu đầu vào`, C: `Số lần thực hiện các phép toán cơ bản bởi chương trình`, D: `Tất cả các phương án trên` }, `B`),
  q(75, `Độ phức tạp không gian của một chương trình đo lường điều gì?`, { A: `Không gian bộ nhớ được sử dụng bởi chương trình`, B: `Thời gian mà chương trình mất để hoàn thành một nhiệm vụ, dựa trên kích thước của dữ liệu đầu vào`, C: `Số lần thực hiện các phép toán cơ bản bởi chương trình`, D: `Tất cả các phương án trên` }, `A`),
  q(76, `Một chương trình/thuật toán là hiệu quả nếu chương trình thực hiện phải như thế nào?`, { A: `Tốn ít thời gian nhưng nhiều bộ nhớ`, B: `Tốn nhiều thời gian và nhiều bộ nhớ`, C: `Tốn ít thời gian và ít bộ nhớ`, D: `Tốn nhiều thời gian nhưng ít bộ nhớ` }, `C`),
  q(
    77,
    `Tìm kết quả ở vòng lặp 3 trong đoạn chương trình sau khi ta nhập dayso = ...`,
    {
      A: `Sau vòng 3 thì A = [5, 8, 0, 10, 4, 3] => điểm dừng j = 0`,
      B: `Sau vòng 3 thì A = [0, 5, 8, 10, 4, 3] => điểm dừng j = -1`,
      C: `Sau vòng 3 thì A = [0, 5, 8, 10, 4, 3] => điểm dừng j = 2`,
      D: `Sau vòng 3 thì A = [0, 4, 5, 8, 10, 3] => điểm dừng j = 0`,
    },
    `C`,
    {
      imageNote: `Bản OCR hiện thiếu đoạn chương trình và dữ liệu dayso của câu 77. Bạn nên thêm ảnh/đoạn mã gốc. Web hiện chấm theo key: C.`,
    }
  ),
  q(
    78,
    `Yêu cầu nhập số tự nhiên n và tính tổng 1 + 2 + ... + n. Sắp xếp thứ tự các bước chứng minh bằng phương pháp quy nạp để kiểm tra tính đúng của chương trình sau?`,
    {
      A: `B2, B1, B3, B4`,
      B: `B1, B4, B3, B2`,
      C: `B3, B1, B2, B4`,
      D: `B2, B4, B3, B1`,
    },
    `D`,
    {
      code: `B1: Vậy chương trình đúng với mọi i
B2: Chương trình đúng ở bước thứ nhất (i = 0): S = 0 + 0 = 0
B3: Chương trình cũng đúng ở bước thứ i+1 (i = 6): S = 0 + 1 + 2 + 3 + 4 + 5 + 6
B4: Giả sử chương trình đúng ở bước thứ i (i = 5): S = 0 + 1 + 2 + 3 + 4 + 5`,
    }
  ),
  q(
    79,
    `Chương trình giải bài toán đếm số các ước số thực sự của số tự nhiên n này đúng hay sai? Nếu sai thì sửa như sau:`,
    {
      A: `Sai, sửa dòng 3 là k = 1`,
      B: `Sai, sửa dòng 4 là k < n`,
      C: `Sai, sửa dòng 3 là k = 1 và dòng 4 là k < n`,
      D: `Đúng`,
    },
    `A`,
    {
      imageNote: `Bản OCR hiện thiếu chương trình gốc của câu 79. Bạn nên thêm ảnh/đoạn mã gốc để luyện sát đề. Web hiện chấm theo key: A.`,
    }
  ),
  q(
    80,
    `Tìm lệnh còn thiếu trong chương trình xuất thời gian của thuật toán tìm kiếm tuần tự phần tử K = 9 của dãy số A sau.`,
    {
      A: `TKTT(A,9)`,
      B: `LinearSearch(A)`,
      C: `LinearSearch(A,9)`,
      D: `linearsearch(A,9)`,
    },
    `C`,
    {
      note: `Nếu bạn có ảnh/đoạn mã gốc của câu 80, có thể bổ sung thêm để hiển thị sát đề hơn.`,
    }
  ),
].map((item) => ({ ...item, ...getSectionInfo(item.id) }));

const questionsById = Object.fromEntries(questions.map((item) => [item.id, item]));

const currentPage = document.body.dataset.page || "home";
const getById = (id) => document.getElementById(id);

const dom = {
  navLinks: Array.from(document.querySelectorAll("[data-page-link]")),

  homeAttempted: getById("homeAttempted"),
  homeAccuracy: getById("homeAccuracy"),
  homeReview: getById("homeReview"),
  homeSessionSummary: getById("homeSessionSummary"),
  homeSessionMeta: getById("homeSessionMeta"),
  homeSectionOverview: getById("homeSectionOverview"),

  sectionChips: getById("sectionChips"),
  modeSelect: getById("modeSelect"),
  countSelect: getById("countSelect"),
  shuffleToggle: getById("shuffleToggle"),
  buildSessionBtn: getById("buildSessionBtn"),
  continueSmartBtn: getById("continueSmartBtn"),
  sessionMetaText: getById("sessionMetaText"),

  statAttempted: getById("statAttempted"),
  statAttemptedDetail: getById("statAttemptedDetail"),
  statUnseen: getById("statUnseen"),
  statLearning: getById("statLearning"),
  statReview: getById("statReview"),
  statMastered: getById("statMastered"),
  statAccuracy: getById("statAccuracy"),
  statAccuracyDetail: getById("statAccuracyDetail"),
  statsSectionGrid: getById("statsSectionGrid"),
  reviewQuestionList: getById("reviewQuestionList"),

  questionPanel: document.querySelector(".question-panel"),
  questionSectionBadge: getById("questionSectionBadge"),
  questionStatusBadge: getById("questionStatusBadge"),
  currentIndexLabel: getById("currentIndexLabel"),
  totalCountLabel: getById("totalCountLabel"),
  sessionProgressBar: getById("sessionProgressBar"),
  questionTitle: getById("questionTitle"),
  questionCode: getById("questionCode"),
  questionImageWrap: getById("questionImageWrap"),
  questionImage: getById("questionImage"),
  questionImageNote: getById("questionImageNote"),
  questionNote: getById("questionNote"),
  optionsList: getById("optionsList"),
  feedbackBox: getById("feedbackBox"),
  prevBtn: getById("prevBtn"),
  toggleReviewBtn: getById("toggleReviewBtn"),
  nextBtn: getById("nextBtn"),

  sessionResultText: getById("sessionResultText"),
  sessionAnswered: getById("sessionAnswered"),
  sessionCorrect: getById("sessionCorrect"),
  sessionWrong: getById("sessionWrong"),
  sessionRemaining: getById("sessionRemaining"),
  questionNavigator: getById("questionNavigator"),
  jumpInput: getById("jumpInput"),
  jumpBtn: getById("jumpBtn"),

  dataOverview: getById("dataOverview"),
  syncDataBox: getById("syncDataBox"),
  exportBtn: getById("exportBtn"),
  copyBtn: getById("copyBtn"),
  importBtn: getById("importBtn"),
  resetProgressBtn: getById("resetProgressBtn"),
  syncMessage: getById("syncMessage"),
  assetNotesList: getById("assetNotesList"),

  toast: getById("toast"),
};

let state = loadState();
let toastTimer = null;

init();

function init() {
  highlightActivePage();
  bindEvents();

  if (currentPage === "practice" && !state.session.questionIds.length) {
    buildSession(null, { notify: false, scroll: false });
    return;
  }

  renderAll();
}

function bindEvents() {
  if (dom.modeSelect) {
    dom.modeSelect.addEventListener("change", () => {
      state.settings.mode = dom.modeSelect.value;
      saveState();
      renderSettings();
    });
  }

  if (dom.countSelect) {
    dom.countSelect.addEventListener("change", () => {
      state.settings.count = dom.countSelect.value === "all" ? "all" : Number(dom.countSelect.value);
      saveState();
      renderSettings();
    });
  }

  if (dom.shuffleToggle) {
    dom.shuffleToggle.addEventListener("change", () => {
      state.settings.shuffle = !!dom.shuffleToggle.checked;
      saveState();
      renderSettings();
    });
  }

  if (dom.buildSessionBtn) {
    dom.buildSessionBtn.addEventListener("click", () => {
      buildSession();
    });
  }

  if (dom.continueSmartBtn) {
    dom.continueSmartBtn.addEventListener("click", () => {
      buildSession({
        mode: "smart",
        count: 10,
        shuffle: true,
      });
    });
  }

  if (dom.prevBtn) {
    dom.prevBtn.addEventListener("click", () => {
      goToQuestion(state.session.currentIndex - 1);
    });
  }

  if (dom.nextBtn) {
    dom.nextBtn.addEventListener("click", () => {
      goToQuestion(state.session.currentIndex + 1);
    });
  }

  if (dom.toggleReviewBtn) {
    dom.toggleReviewBtn.addEventListener("click", () => {
      toggleManualReview();
    });
  }

  if (dom.jumpBtn) {
    dom.jumpBtn.addEventListener("click", jumpToPosition);
  }

  if (dom.jumpInput) {
    dom.jumpInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        jumpToPosition();
      }
    });
  }

  if (dom.exportBtn) {
    dom.exportBtn.addEventListener("click", exportData);
  }

  if (dom.copyBtn) {
    dom.copyBtn.addEventListener("click", copyData);
  }

  if (dom.importBtn) {
    dom.importBtn.addEventListener("click", importData);
  }

  if (dom.resetProgressBtn) {
    dom.resetProgressBtn.addEventListener("click", resetAllProgress);
  }

  if (dom.questionPanel) {
    window.addEventListener("keydown", handleKeyboard);
  }
}

function createDefaultState() {
  return {
    questionStats: {},
    settings: {
      selectedSection: "all",
      mode: "smart",
      count: 20,
      shuffle: true,
    },
    session: {
      questionIds: [],
      answers: {},
      currentIndex: 0,
      createdAt: 0,
    },
  };
}

function createEmptyStat() {
  return {
    attempts: 0,
    correct: 0,
    wrong: 0,
    streak: 0,
    lastResult: null,
    lastAnsweredAt: 0,
    manualReview: false,
  };
}

function normalizeSettings(raw = {}) {
  const validSectionIds = new Set(sectionConfig.map((item) => item.id));
  const validModes = new Set(Object.keys(modeLabels));
  let count = raw.count;

  if (count !== "all") {
    count = Number(count);
  }

  const validCounts = new Set([10, 15, 20, 30, 40, "all"]);

  return {
    selectedSection: validSectionIds.has(raw.selectedSection) ? raw.selectedSection : "all",
    mode: validModes.has(raw.mode) ? raw.mode : "smart",
    count: validCounts.has(count) ? count : 20,
    shuffle: raw.shuffle !== undefined ? !!raw.shuffle : true,
  };
}

function normalizeStats(rawStats = {}) {
  const normalized = {};

  questions.forEach((question) => {
    const source = rawStats[question.id] || rawStats[String(question.id)];
    if (!source) return;

    const correct = Math.max(0, Number(source.correct) || 0);
    const wrong = Math.max(0, Number(source.wrong) || 0);
    const attemptsSource = Math.max(0, Number(source.attempts) || 0);
    const attempts = Math.max(attemptsSource, correct + wrong);

    normalized[question.id] = {
      attempts,
      correct,
      wrong,
      streak: Math.max(0, Number(source.streak) || 0),
      lastResult: source.lastResult === "correct" || source.lastResult === "wrong" ? source.lastResult : null,
      lastAnsweredAt: Math.max(0, Number(source.lastAnsweredAt) || 0),
      manualReview: !!source.manualReview,
    };
  });

  return normalized;
}

function normalizeSession(rawSession = {}) {
  const validIds = new Set(questions.map((item) => item.id));
  const questionIds = Array.isArray(rawSession.questionIds)
    ? rawSession.questionIds.map(Number).filter((id) => validIds.has(id))
    : [];

  const answers = {};
  if (rawSession.answers && typeof rawSession.answers === "object") {
    Object.entries(rawSession.answers).forEach(([id, value]) => {
      const numericId = Number(id);
      if (!validIds.has(numericId) || !questionIds.includes(numericId)) return;
      const selected = String(value.selected || "").toUpperCase();
      if (!ANSWER_ORDER.includes(selected)) return;

      answers[numericId] = {
        selected,
        isCorrect: !!value.isCorrect,
        answeredAt: Math.max(0, Number(value.answeredAt) || 0),
      };
    });
  }

  const maxIndex = Math.max(questionIds.length - 1, 0);
  const currentIndex = Math.min(Math.max(Number(rawSession.currentIndex) || 0, 0), maxIndex);

  return {
    questionIds,
    answers,
    currentIndex,
    createdAt: Math.max(0, Number(rawSession.createdAt) || 0),
  };
}

function loadState() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!raw) return createDefaultState();

    const fresh = createDefaultState();
    fresh.questionStats = normalizeStats(raw.questionStats || {});
    fresh.settings = normalizeSettings(raw.settings || {});
    fresh.session = normalizeSession(raw.session || {});
    return fresh;
  } catch (error) {
    return createDefaultState();
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(getPersistedState()));
  } catch (error) {
    // im lặng để tránh làm gián đoạn trải nghiệm trên máy chặn storage
  }
}

function getPersistedState() {
  return {
    version: APP_VERSION,
    questionStats: state.questionStats,
    settings: state.settings,
    session: state.session,
  };
}

function highlightActivePage() {
  dom.navLinks.forEach((link) => {
    const isCurrent = link.dataset.pageLink === currentPage;
    if (isCurrent) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function formatDateTime(timestamp) {
  return timestamp ? new Date(timestamp).toLocaleString("vi-VN") : "chưa có";
}

function truncateText(text, maxLength = 88) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).trimEnd()}…`;
}

function getStorageSizeLabel() {
  const size = JSON.stringify(getPersistedState()).length;
  return `${Math.max(1, Math.round(size / 1024))} KB`;
}

function getSelectedSectionMeta() {
  return sectionConfig.find((item) => item.id === state.settings.selectedSection) || sectionConfig[0];
}

function getStat(questionId) {
  return state.questionStats[questionId] || createEmptyStat();
}

function ensureStat(questionId) {
  if (!state.questionStats[questionId]) {
    state.questionStats[questionId] = createEmptyStat();
  }
  return state.questionStats[questionId];
}

function getAccuracy(stat) {
  return stat.attempts ? stat.correct / stat.attempts : 0;
}

function getQuestionStatus(questionId) {
  const stat = state.questionStats[questionId];
  if (!stat) return "unseen";
  if (stat.manualReview) return "review";
  if (stat.attempts === 0) return "unseen";

  const accuracy = getAccuracy(stat);

  if (stat.lastResult === "wrong" || accuracy < 0.6) {
    return "review";
  }

  if (stat.attempts >= 3 && accuracy >= 0.8 && stat.streak >= 2) {
    return "mastered";
  }

  return "learning";
}

function getPriority(questionId) {
  const stat = state.questionStats[questionId];

  if (!stat) return 1000;
  if (stat.attempts === 0) return stat.manualReview ? 1100 : 1000;

  const accuracy = getAccuracy(stat);
  const daysSince = stat.lastAnsweredAt
    ? Math.max(0, (Date.now() - stat.lastAnsweredAt) / 86400000)
    : 30;

  let score = 0;
  score += Math.round((1 - accuracy) * 220);
  score += Math.min(daysSince * 4, 120);

  if (stat.manualReview) score += 350;
  if (stat.lastResult === "wrong") score += 250;
  if (stat.streak === 0) score += 80;
  if (stat.streak >= 2) score -= 60;

  return score;
}

function getPoolBySection(sectionId = state.settings.selectedSection) {
  if (sectionId === "all") return [...questions];
  return questions.filter((item) => item.sectionId === sectionId);
}

function getRequestedCount(total) {
  if (state.settings.count === "all") return total;
  return Math.min(Number(state.settings.count) || total, total);
}

function getGlobalMetrics() {
  let attempted = 0;
  let totalAttempts = 0;
  let totalCorrect = 0;
  let unseen = 0;
  let learning = 0;
  let review = 0;
  let mastered = 0;

  questions.forEach((question) => {
    const stat = getStat(question.id);
    const status = getQuestionStatus(question.id);

    if (stat.attempts > 0) attempted += 1;
    totalAttempts += stat.attempts;
    totalCorrect += stat.correct;

    if (status === "unseen") unseen += 1;
    if (status === "learning") learning += 1;
    if (status === "review") review += 1;
    if (status === "mastered") mastered += 1;
  });

  return {
    attempted,
    totalAttempts,
    totalCorrect,
    unseen,
    learning,
    review,
    mastered,
    accuracy: totalAttempts ? Math.round((totalCorrect / totalAttempts) * 100) : 0,
  };
}

function getSectionMetrics(sectionId) {
  const pool = getPoolBySection(sectionId);
  let attempted = 0;
  let totalAttempts = 0;
  let totalCorrect = 0;
  let unseen = 0;
  let learning = 0;
  let review = 0;
  let mastered = 0;

  pool.forEach((question) => {
    const stat = getStat(question.id);
    const status = getQuestionStatus(question.id);

    if (stat.attempts > 0) attempted += 1;
    totalAttempts += stat.attempts;
    totalCorrect += stat.correct;

    if (status === "unseen") unseen += 1;
    if (status === "learning") learning += 1;
    if (status === "review") review += 1;
    if (status === "mastered") mastered += 1;
  });

  return {
    total: pool.length,
    attempted,
    totalAttempts,
    totalCorrect,
    unseen,
    learning,
    review,
    mastered,
    accuracy: totalAttempts ? Math.round((totalCorrect / totalAttempts) * 100) : 0,
  };
}

function getSessionMetrics() {
  const total = state.session.questionIds.length;
  const answers = Object.values(state.session.answers);
  const answered = answers.length;
  const correct = answers.filter((item) => item.isCorrect).length;
  const wrong = answered - correct;

  return {
    total,
    answered,
    correct,
    wrong,
    remaining: Math.max(total - answered, 0),
  };
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function buildSession(customSettings = null, options = {}) {
  const notify = options.notify !== false;
  const shouldScroll = options.scroll !== false;

  state.settings = normalizeSettings({ ...state.settings, ...(customSettings || {}) });

  const pool = getPoolBySection(state.settings.selectedSection);
  let selected = [];
  let usedFallback = false;

  switch (state.settings.mode) {
    case "smart":
      selected = [...pool]
        .map((item) => ({
          item,
          priority: getPriority(item.id),
          tie: Math.random(),
        }))
        .sort((a, b) => (b.priority - a.priority) || (a.tie - b.tie))
        .map((entry) => entry.item);
      break;

    case "all":
      selected = [...pool];
      break;

    default:
      selected = pool.filter((item) => getQuestionStatus(item.id) === state.settings.mode);
      break;
  }

  if (!selected.length) {
    selected = [...pool];
    usedFallback = true;
  }

  const requestedCount = getRequestedCount(selected.length);

  if (state.settings.mode === "smart") {
    selected = selected.slice(0, requestedCount);
    if (state.settings.shuffle) shuffleArray(selected);
  } else {
    if (state.settings.shuffle) shuffleArray(selected);
    selected = selected.slice(0, requestedCount);
  }

  state.session = {
    questionIds: selected.map((item) => item.id),
    answers: {},
    currentIndex: 0,
    createdAt: Date.now(),
  };

  saveState();
  renderAll();
  if (shouldScroll && currentPage === "practice") {
    scrollQuestionIntoView();
  }

  if (notify) {
    showToast(
      usedFallback
        ? `Bộ lọc hiện chưa có câu phù hợp. Mình đã chuyển sang tất cả câu trong phần đã chọn (${state.session.questionIds.length} câu).`
        : `Đã tạo lượt học ${state.session.questionIds.length} câu.`,
      usedFallback ? "info" : "success"
    );
  }
}

function renderAll() {
  renderHomeOverview();
  renderSectionChips();
  renderSettings();
  renderGlobalStats();
  renderSectionSummaryCards(dom.homeSectionOverview);
  renderSectionSummaryCards(dom.statsSectionGrid);
  renderReviewQuestionList();
  renderDataOverview();
  renderAssetNotes();
  renderSessionOverview();
  renderCurrentQuestion();
  renderNavigator();
}

function renderSectionChips() {
  if (!dom.sectionChips) return;

  dom.sectionChips.innerHTML = "";

  sectionConfig.forEach((section) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `chip ${state.settings.selectedSection === section.id ? "active" : ""}`;
    button.innerHTML = `<span>${section.title}</span><small>${section.subtitle}</small>`;
    button.addEventListener("click", () => {
      state.settings.selectedSection = section.id;
      saveState();
      renderSectionChips();
      renderSettings();
    });
    dom.sectionChips.appendChild(button);
  });
}

function renderSettings() {
  if (!dom.modeSelect || !dom.countSelect || !dom.shuffleToggle || !dom.sessionMetaText) {
    return;
  }

  dom.modeSelect.value = state.settings.mode;
  dom.countSelect.value = String(state.settings.count);
  dom.shuffleToggle.checked = !!state.settings.shuffle;

  const section = getSelectedSectionMeta();
  const countLabel =
    state.settings.count === "all" ? "tất cả câu trong phần" : `${state.settings.count} câu`;

  dom.sessionMetaText.textContent =
    `Đang chọn: ${section.title} • ${modeLabels[state.settings.mode]} • ${countLabel} • ` +
    `${state.settings.shuffle ? "có đảo câu" : "giữ nguyên thứ tự"}. ` +
    `Nhấn “Áp dụng & tạo lượt học” để làm mới lượt.`;
}

function renderGlobalStats() {
  const metrics = getGlobalMetrics();

  if (dom.statAttempted) {
    dom.statAttempted.textContent = `${metrics.attempted}/${questions.length}`;
  }
  if (dom.statAttemptedDetail) {
    dom.statAttemptedDetail.textContent = `${metrics.totalAttempts} lượt trả lời`;
  }
  if (dom.statUnseen) {
    dom.statUnseen.textContent = metrics.unseen;
  }
  if (dom.statLearning) {
    dom.statLearning.textContent = metrics.learning;
  }
  if (dom.statReview) {
    dom.statReview.textContent = metrics.review;
  }
  if (dom.statMastered) {
    dom.statMastered.textContent = metrics.mastered;
  }
  if (dom.statAccuracy) {
    dom.statAccuracy.textContent = `${metrics.accuracy}%`;
  }
  if (dom.statAccuracyDetail) {
    dom.statAccuracyDetail.textContent = `${metrics.totalCorrect} câu đúng / ${metrics.totalAttempts} lần trả lời`;
  }
}

function renderHomeOverview() {
  const metrics = getGlobalMetrics();
  const sessionMetrics = getSessionMetrics();

  if (dom.homeAttempted) {
    dom.homeAttempted.textContent = `${metrics.attempted}/${questions.length}`;
  }

  if (dom.homeAccuracy) {
    dom.homeAccuracy.textContent = `${metrics.accuracy}%`;
  }

  if (dom.homeReview) {
    dom.homeReview.textContent = String(metrics.review);
  }

  if (dom.homeSessionSummary) {
    dom.homeSessionSummary.textContent = sessionMetrics.total
      ? `Lượt hiện tại đã trả lời ${sessionMetrics.answered}/${sessionMetrics.total} câu.`
      : "Chưa có lượt học nào được tạo.";
  }

  if (dom.homeSessionMeta) {
    dom.homeSessionMeta.textContent = sessionMetrics.total
      ? `Đúng ${sessionMetrics.correct} • Sai ${sessionMetrics.wrong} • Tạo lúc ${formatDateTime(state.session.createdAt)}.`
      : "Vào trang làm bài để tạo hoặc tiếp tục lượt học.";
  }
}

function renderSectionSummaryCards(container) {
  if (!container) return;

  container.innerHTML = "";

  sectionConfig
    .filter((section) => section.id !== "all")
    .forEach((section) => {
      const metrics = getSectionMetrics(section.id);
      const progress = metrics.total ? Math.round((metrics.attempted / metrics.total) * 100) : 0;
      const card = document.createElement("article");
      card.className = "section-summary-card";
      card.innerHTML = `
        <div class="section-summary-head">
          <div>
            <h3>${section.title}</h3>
            <p>${section.subtitle}</p>
          </div>
          <strong>${metrics.attempted}/${metrics.total}</strong>
        </div>
        <div class="meter"><span style="width: ${progress}%"></span></div>
        <div class="section-tags">
          <span>Chưa học ${metrics.unseen}</span>
          <span>Đang học ${metrics.learning}</span>
          <span>Cần ôn ${metrics.review}</span>
          <span>Đã chắc ${metrics.mastered}</span>
        </div>
        <p class="section-summary-note">Độ chính xác ${metrics.accuracy}%</p>
      `;
      container.appendChild(card);
    });
}

function renderReviewQuestionList() {
  if (!dom.reviewQuestionList) return;

  const reviewQuestions = questions
    .filter((question) => getQuestionStatus(question.id) === "review")
    .sort((left, right) => getPriority(right.id) - getPriority(left.id))
    .slice(0, 12);

  dom.reviewQuestionList.innerHTML = "";

  if (!reviewQuestions.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Chưa có câu nào đang ở trạng thái cần ôn.";
    dom.reviewQuestionList.appendChild(empty);
    return;
  }

  reviewQuestions.forEach((question) => {
    const stat = getStat(question.id);
    const item = document.createElement("article");
    item.className = "review-item";

    const content = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = `Câu ${question.id}. ${truncateText(question.stem)}`;

    const meta = document.createElement("p");
    meta.textContent = `${question.sectionTitle} • Sai ${stat.wrong} lần • Cập nhật ${formatDateTime(stat.lastAnsweredAt)}`;

    content.appendChild(title);
    content.appendChild(meta);

    const side = document.createElement("div");
    side.className = "review-item-meta";

    const tag = document.createElement("span");
    tag.textContent = stat.manualReview ? "Đã đánh dấu" : "Sai gần đây";

    const accuracy = document.createElement("span");
    accuracy.textContent = stat.attempts ? `${Math.round(getAccuracy(stat) * 100)}% đúng` : "Chưa trả lời";

    side.appendChild(tag);
    side.appendChild(accuracy);

    item.appendChild(content);
    item.appendChild(side);
    dom.reviewQuestionList.appendChild(item);
  });
}

function renderDataOverview() {
  if (!dom.dataOverview) return;

  const metrics = getGlobalMetrics();
  const sessionMetrics = getSessionMetrics();
  const cards = [
    { label: "Đã học", value: `${metrics.attempted}/${questions.length}` },
    { label: "Cần ôn", value: String(metrics.review) },
    { label: "Lượt hiện tại", value: sessionMetrics.total ? `${sessionMetrics.answered}/${sessionMetrics.total}` : "Chưa tạo" },
    { label: "Dung lượng", value: getStorageSizeLabel() },
  ];

  dom.dataOverview.innerHTML = "";

  cards.forEach((entry) => {
    const card = document.createElement("article");
    card.className = "data-point";
    card.innerHTML = `<span>${entry.label}</span><strong>${entry.value}</strong>`;
    dom.dataOverview.appendChild(card);
  });
}

function renderSessionOverview() {
  if (!dom.sessionAnswered || !dom.sessionCorrect || !dom.sessionWrong || !dom.sessionRemaining) {
    return;
  }

  const metrics = getSessionMetrics();

  dom.sessionAnswered.textContent = metrics.answered;
  dom.sessionCorrect.textContent = metrics.correct;
  dom.sessionWrong.textContent = metrics.wrong;
  dom.sessionRemaining.textContent = metrics.remaining;

  if (dom.sessionResultText) {
    dom.sessionResultText.textContent = metrics.answered
      ? `${metrics.correct} đúng • ${metrics.wrong} sai`
      : "Chưa trả lời";
  }

  if (dom.jumpInput) {
    dom.jumpInput.max = metrics.total || 1;
    dom.jumpInput.placeholder = metrics.total ? `1 - ${metrics.total}` : "1";
  }
}

function getCurrentQuestion() {
  if (!state.session.questionIds.length) return null;
  const questionId = state.session.questionIds[state.session.currentIndex];
  return questionsById[questionId] || null;
}

function renderCurrentQuestion() {
  if (!dom.questionTitle || !dom.questionSectionBadge || !dom.questionStatusBadge) {
    return;
  }

  const question = getCurrentQuestion();
  const total = state.session.questionIds.length;

  if (!question) {
    dom.questionSectionBadge.textContent = "Chưa có lượt học";
    dom.questionStatusBadge.className = "badge";
    dom.questionStatusBadge.textContent = "Không có dữ liệu";
    dom.currentIndexLabel.textContent = "0";
    dom.totalCountLabel.textContent = "0";
    dom.sessionProgressBar.style.width = "0%";
    dom.questionTitle.textContent = "Chưa có câu hỏi phù hợp. Hãy tạo lượt học mới.";
    dom.questionCode.className = "question-code hidden";
    dom.questionCode.textContent = "";
    dom.questionImageWrap.classList.add("hidden");
    dom.questionImage.removeAttribute("src");
    dom.questionImageNote.className = "inline-note warning hidden";
    dom.questionImageNote.textContent = "";
    dom.questionNote.className = "inline-note hidden";
    dom.questionNote.textContent = "";
    dom.optionsList.innerHTML = "";
    dom.feedbackBox.className = "feedback-box hidden";
    dom.feedbackBox.textContent = "";
    dom.prevBtn.disabled = true;
    dom.nextBtn.disabled = true;
    dom.toggleReviewBtn.disabled = true;
    return;
  }

  const answerInfo = state.session.answers[question.id];
  const status = getQuestionStatus(question.id);

  dom.questionSectionBadge.className = "badge badge-accent";
  dom.questionSectionBadge.textContent = question.sectionTitle;
  dom.questionStatusBadge.className = `badge status-${status}`;
  dom.questionStatusBadge.textContent = statusLabels[status];

  dom.currentIndexLabel.textContent = String(state.session.currentIndex + 1);
  dom.totalCountLabel.textContent = String(total);
  dom.sessionProgressBar.style.width = `${((state.session.currentIndex + 1) / total) * 100}%`;

  dom.questionTitle.textContent = `Câu ${question.id}. ${question.stem}`;

  if (question.code) {
    dom.questionCode.textContent = question.code;
    dom.questionCode.classList.remove("hidden");
  } else {
    dom.questionCode.textContent = "";
    dom.questionCode.classList.add("hidden");
  }

  if (question.image) {
    dom.questionImage.alt = `Ảnh minh họa câu ${question.id}`;
    dom.questionImage.onerror = () => {
      dom.questionImageWrap.classList.add("hidden");
      dom.questionImageNote.className = "inline-note warning";
      dom.questionImageNote.textContent =
        (question.imageNote ? `${question.imageNote} ` : "") +
        `Không tải được ảnh: ${question.image}`;
    };
    dom.questionImage.src = question.image;
    dom.questionImageWrap.classList.remove("hidden");
  } else {
    dom.questionImageWrap.classList.add("hidden");
    dom.questionImage.removeAttribute("src");
    dom.questionImage.onerror = null;
  }

  if (question.imageNote) {
    dom.questionImageNote.className = "inline-note warning";
    dom.questionImageNote.textContent = question.imageNote;
  } else {
    dom.questionImageNote.className = "inline-note warning hidden";
    dom.questionImageNote.textContent = "";
  }

  if (question.note) {
    dom.questionNote.className = "inline-note";
    dom.questionNote.textContent = question.note;
  } else {
    dom.questionNote.className = "inline-note hidden";
    dom.questionNote.textContent = "";
  }

  dom.optionsList.innerHTML = "";

  ANSWER_ORDER.forEach((key) => {
    if (!(key in question.options)) return;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-btn";

    const keyNode = document.createElement("span");
    keyNode.className = "option-key";
    keyNode.textContent = key;

    const textNode = document.createElement("span");
    textNode.className = "option-text";
    textNode.textContent = question.options[key];

    button.appendChild(keyNode);
    button.appendChild(textNode);

    if (answerInfo) {
      button.disabled = true;

      if (key === answerInfo.selected) {
        button.classList.add("selected");
      }

      if (key === question.answer) {
        button.classList.add("correct");
      } else if (key === answerInfo.selected && !answerInfo.isCorrect) {
        button.classList.add("wrong");
      }
    } else {
      button.addEventListener("click", () => {
        submitAnswer(question.id, key);
      });
    }

    dom.optionsList.appendChild(button);
  });

  if (answerInfo) {
    const correctText = `${question.answer}. ${question.options[question.answer]}`;
    dom.feedbackBox.className = `feedback-box ${answerInfo.isCorrect ? "success" : "error"}`;
    dom.feedbackBox.textContent = answerInfo.isCorrect
      ? `Chính xác! Đáp án: ${correctText}`
      : `Chưa đúng. Bạn chọn ${answerInfo.selected}. Đáp án đúng: ${correctText}`;
  } else {
    dom.feedbackBox.className = "feedback-box hidden";
    dom.feedbackBox.textContent = "";
  }

  const currentStat = getStat(question.id);
  dom.toggleReviewBtn.disabled = false;
  dom.toggleReviewBtn.textContent = currentStat.manualReview
    ? "Bỏ đánh dấu cần ôn"
    : "Đánh dấu cần ôn";

  dom.prevBtn.disabled = state.session.currentIndex <= 0;
  dom.nextBtn.disabled = state.session.currentIndex >= total - 1;
}

function renderNavigator() {
  if (!dom.questionNavigator) return;

  dom.questionNavigator.innerHTML = "";

  state.session.questionIds.forEach((id, index) => {
    const button = document.createElement("button");
    button.type = "button";

    const answerInfo = state.session.answers[id];
    const status = getQuestionStatus(id);

    let className = "nav-btn";
    if (answerInfo) {
      className += answerInfo.isCorrect ? " answered-correct" : " answered-wrong";
    } else {
      className += ` status-${status}`;
    }
    if (index === state.session.currentIndex) {
      className += " current";
    }

    button.className = className;
    button.textContent = String(id);
    button.title = `Câu ${id} • ${statusLabels[status]}`;
    button.addEventListener("click", () => {
      goToQuestion(index);
    });

    dom.questionNavigator.appendChild(button);
  });
}

function submitAnswer(questionId, selectedKey) {
  if (state.session.answers[questionId]) return;

  const question = questionsById[questionId];
  if (!question) return;

  const isCorrect = selectedKey === question.answer;

  state.session.answers[questionId] = {
    selected: selectedKey,
    isCorrect,
    answeredAt: Date.now(),
  };

  updateQuestionStats(questionId, isCorrect);
  saveState();
  renderGlobalStats();
  renderSessionOverview();
  renderCurrentQuestion();
  renderNavigator();

  showToast(
    isCorrect ? "Chính xác!" : `Chưa đúng • Đáp án ${question.answer}`,
    isCorrect ? "success" : "error"
  );
}

function updateQuestionStats(questionId, isCorrect) {
  const stat = ensureStat(questionId);

  stat.attempts += 1;
  stat.lastAnsweredAt = Date.now();

  if (isCorrect) {
    stat.correct += 1;
    stat.streak += 1;
    stat.lastResult = "correct";

    if (stat.manualReview && stat.streak >= 2) {
      stat.manualReview = false;
    }
  } else {
    stat.wrong += 1;
    stat.streak = 0;
    stat.lastResult = "wrong";
    stat.manualReview = true;
  }
}

function toggleManualReview() {
  const question = getCurrentQuestion();
  if (!question) return;

  const stat = ensureStat(question.id);
  stat.manualReview = !stat.manualReview;

  saveState();
  renderGlobalStats();
  renderCurrentQuestion();
  renderNavigator();

  showToast(
    stat.manualReview
      ? `Đã đánh dấu câu ${question.id} là cần ôn.`
      : `Đã bỏ đánh dấu cần ôn cho câu ${question.id}.`,
    "info"
  );
}

function goToQuestion(index) {
  const total = state.session.questionIds.length;
  if (!total) return;
  if (index < 0 || index >= total) return;

  state.session.currentIndex = index;
  saveState();
  renderSessionOverview();
  renderCurrentQuestion();
  renderNavigator();
  scrollQuestionIntoView();
}

function jumpToPosition() {
  if (!dom.jumpInput) return;

  const total = state.session.questionIds.length;
  if (!total) return;

  const value = Number(dom.jumpInput.value);
  if (!value || value < 1 || value > total) {
    showToast(`Vui lòng nhập vị trí từ 1 đến ${total}.`, "error");
    return;
  }

  goToQuestion(value - 1);
}

function scrollQuestionIntoView() {
  if (window.innerWidth <= 980 && dom.questionPanel) {
    dom.questionPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function handleKeyboard(event) {
  const activeTag = document.activeElement ? document.activeElement.tagName : "";
  const isTypingField = ["INPUT", "TEXTAREA", "SELECT"].includes(activeTag);
  if (isTypingField) return;

  const currentQuestion = getCurrentQuestion();
  if (!currentQuestion) return;

  const key = event.key.toLowerCase();

  if (["a", "b", "c", "d"].includes(key)) {
    event.preventDefault();
    submitAnswer(currentQuestion.id, key.toUpperCase());
    return;
  }

  if (event.key === "ArrowRight") {
    event.preventDefault();
    goToQuestion(state.session.currentIndex + 1);
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    goToQuestion(state.session.currentIndex - 1);
  }
}

function renderAssetNotes() {
  if (!dom.assetNotesList) return;

  dom.assetNotesList.innerHTML = "";

  assetNotes.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `Câu ${item.id}${item.required ? "" : " (tùy chọn)"}: ${item.text}`;
    dom.assetNotesList.appendChild(li);
  });

  const hint = document.createElement("li");
  hint.textContent =
    `Cách thêm ảnh: trong javascript.js, tìm câu tương ứng và thêm thuộc tính image: "images/q55.png" (ví dụ).`;
  dom.assetNotesList.appendChild(hint);
}

function exportData() {
  if (!dom.syncDataBox || !dom.syncMessage) return;

  const payload = {
    app: "TinHoc11-HK2-TracNghiem",
    exportedAt: new Date().toISOString(),
    ...getPersistedState(),
  };

  dom.syncDataBox.value = JSON.stringify(payload, null, 2);
  dom.syncMessage.textContent = `Đã tạo dữ liệu xuất lúc ${new Date().toLocaleString("vi-VN")}.`;
  showToast("Đã tạo dữ liệu xuất.", "success");
}

async function copyData() {
  if (!dom.syncDataBox || !dom.syncMessage) return;

  if (!dom.syncDataBox.value.trim()) {
    exportData();
  }

  const text = dom.syncDataBox.value;

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      dom.syncDataBox.focus();
      dom.syncDataBox.select();
      dom.syncDataBox.setSelectionRange(0, dom.syncDataBox.value.length);
      const copied = document.execCommand("copy");
      if (!copied) {
        throw new Error("copy_failed");
      }
    }

    dom.syncMessage.textContent = "Đã copy dữ liệu vào clipboard.";
    showToast("Đã copy dữ liệu.", "success");
  } catch (error) {
    dom.syncDataBox.focus();
    dom.syncDataBox.select();
    dom.syncDataBox.setSelectionRange(0, dom.syncDataBox.value.length);
    showToast("Không thể copy tự động. Đoạn JSON đã được bôi chọn để bạn copy thủ công.", "info");
  }
}

function importData() {
  if (!dom.syncDataBox || !dom.syncMessage) return;

  const raw = dom.syncDataBox.value.trim();

  if (!raw) {
    showToast("Bạn chưa dán dữ liệu để nhập.", "error");
    return;
  }

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    showToast("Dữ liệu không phải JSON hợp lệ.", "error");
    return;
  }

  const statsSource = parsed.questionStats || parsed;
  const normalizedStats = normalizeStats(statsSource);
  const normalizedSettings = normalizeSettings(parsed.settings || state.settings);
  const normalizedSession = normalizeSession(parsed.session || {});

  if (!confirm("Nhập dữ liệu sẽ ghi đè tiến trình hiện tại. Tiếp tục?")) {
    return;
  }

  state.questionStats = normalizedStats;
  state.settings = normalizedSettings;
  state.session = normalizedSession;

  saveState();

  if (currentPage === "practice" && !state.session.questionIds.length) {
    buildSession(null, { notify: false, scroll: false });
  } else {
    renderAll();
  }

  dom.syncMessage.textContent = `Đã nhập dữ liệu thành công lúc ${new Date().toLocaleString("vi-VN")}.`;
  showToast("Đã nhập dữ liệu thành công.", "success");
}

function resetAllProgress() {
  if (!confirm("Bạn chắc chắn muốn xóa toàn bộ tiến trình và lượt học hiện tại?")) {
    return;
  }

  state = createDefaultState();

  if (dom.syncDataBox) {
    dom.syncDataBox.value = "";
  }

  if (dom.syncMessage) {
    dom.syncMessage.textContent = "Đã xóa toàn bộ tiến trình.";
  }

  if (currentPage === "practice") {
    buildSession(null, { notify: false, scroll: false });
  } else {
    saveState();
    renderAll();
  }

  showToast("Đã xóa toàn bộ tiến trình.", "success");
}

function showToast(message, type = "info") {
  if (!dom.toast) return;

  clearTimeout(toastTimer);

  dom.toast.textContent = message;
  dom.toast.className = `toast ${type}`;

  toastTimer = setTimeout(() => {
    dom.toast.classList.add("hidden");
  }, 2400);
}