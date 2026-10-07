| ID | Field | Input | Expected | Actual | Pass/Fail |
|----|-------|-------|----------|--------|-----------|
| T1 | Name | Samruddhi  | Accept | | |
| T2 | Name | Sam123 | Reject | | |
| T3 | Email | user@mail.com | Accept | | |
| T4 | Email | user@mail | Reject | | |
| T5 | Phone | 9876543210 | Accept | | |
| T6 | Phone | 12345 | Reject | | |
| T7 | Password | Test@1234 | Accept | | |
| T8 | Password | test | Reject | | |
| T9 | Comment | Stay safe | Accept | | |
| T10 | Comment | <script>x</script> | Reject | | |
| T11 | Register | Same email twice | Reject | | |
| T12 | Comment | Post without login | Reject | | |